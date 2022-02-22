/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

(function () {
  const PROBE_INTERVAL_MILLIS = Number.parseInt('${intervalMillis}')
  const SESSION_PROBE_PATH = '${sessionProbeUrl}'
  const BASE_LOGOUT_PATH = '${baseLogoutUrl}'
  const NEXT_URL_PARAM = 'nextUrl'
  const PREFIX = '${sessionProbePrefix}'
  const LOGGING_ENABLED = '${enableLogging}' === 'true'
  const SESSION_PROBE_COOKIE_NAME = `${PREFIX}-SP`
  const TAB_HOLDING_SESSION_PROBE_MUTEX = `${PREFIX}-MUTEX`
  const LOGOUT_EVENT = `${PREFIX}-LOGOUT`
  const RELOAD_EVENT = `${PREFIX}-RELOAD`
  const TAB_HEALTH_CHECK_EVENT = `${PREFIX}-HEALTH`
  const HEALTH_CHECK_INTERVAL = 10000
  const MUTEX_LOCK_TIMEOUT = 2 * HEALTH_CHECK_INTERVAL
  const MUTEX_CHECK_DELAY = 150
  const MAX_ATTEMPTS = 3
  const TAB_ID = `${performance.now() | 0}:${Math.random() * 1000000000 | 0}`
  const TAB_CREATED_AT = new Date()

  const tabIdToLastActiveAt = new Map()

  let currentProbeIntervalMillis = PROBE_INTERVAL_MILLIS;
  let currentAttempt = 0;

  let eventBus = {
    subscribe: (topic, onMessageCallback) =>
      window.addEventListener("storage", event => {
          if (event.key === topic && event.newValue != null) {
            onMessageCallback(event.newValue)
          }
        }
      ),
    publish: (topic, message) => localStorage.setItem(topic, JSON.stringify(message))
  }

  let mutex = {
    unlock: () => localStorage.removeItem(TAB_HOLDING_SESSION_PROBE_MUTEX),
    tryToAcquire: () => localStorage.setItem(TAB_HOLDING_SESSION_PROBE_MUTEX, TAB_ID),
    isAcquired: () => localStorage.getItem(TAB_HOLDING_SESSION_PROBE_MUTEX) === TAB_ID,
    getHolderId: () => localStorage.getItem(TAB_HOLDING_SESSION_PROBE_MUTEX),
    runIfAcquired: (callback) => setTimeout(() => {
      if (mutex.isAcquired()) {
        callback();
      }
    }, MUTEX_CHECK_DELAY)
  }

  eventBus.subscribe(TAB_HEALTH_CHECK_EVENT, recordTabHealthCheck)
  eventBus.subscribe(LOGOUT_EVENT, redirectToLogout)
  eventBus.subscribe(RELOAD_EVENT, reload)

  publishHealthCheck()
  setTimeout(checkSessionValidity, 2 * HEALTH_CHECK_INTERVAL) // initial timeout so that we gather all health checks

  function logAsSessionProbe(message) {
    if (LOGGING_ENABLED) {
      console.log(`[ROR|sessionProbe] ${message}`)
    }
  }

  function recordTabHealthCheck(message) {
      logAsSessionProbe(`Event ${TAB_HEALTH_CHECK_EVENT}: ${message}`)
      const parsed = JSON.parse(message);
      tabIdToLastActiveAt.set(parsed.tabId, parsed.lastActiveAt)
  }

  function publishHealthCheck() {
    const message = { tabId: TAB_ID, lastActiveAt: new Date().getTime() }
    eventBus.publish(TAB_HEALTH_CHECK_EVENT, message);
    tabIdToLastActiveAt.set(message.tabId, message.lastActiveAt)
    setTimeout(publishHealthCheck, HEALTH_CHECK_INTERVAL)
  }

  function checkSessionValidity() {
    if (shouldCheckSession()) {
      mutex.tryToAcquire()
      mutex.runIfAcquired(getSessionProbe)
    }
    setTimeout(checkSessionValidity, HEALTH_CHECK_INTERVAL);
  }

  function shouldCheckSession() {
    return !isValidSessionProbeCookiePresent() && !isSessionProbeCurrentlyBeingChecked();
  }

  function isSessionProbeCurrentlyBeingChecked() {
    const tabIdHoldingMutex = mutex.getHolderId();
    if (tabIdHoldingMutex == null) {
      logAsSessionProbe(`Session probe not currently being checked`)
      return false
    }
    if (mutex.isAcquired()) {
      logAsSessionProbe(`Current tab is currently checking session probe`)
      return true
    }
    if (tabIdToLastActiveAt.get(tabIdHoldingMutex) < (new Date().getTime() + MUTEX_LOCK_TIMEOUT)) {
      logAsSessionProbe(`Session probe currently being checked by tabId: ${tabIdHoldingMutex}`)
      return true
    }
    logAsSessionProbe(`Session probe mutex timed out`)
    return false
  }

  function isValidSessionProbeCookiePresent() {
    const cookie = Cookies.get(SESSION_PROBE_COOKIE_NAME);
    if (cookie == null) {
      logAsSessionProbe(`No valid session probe cookie found`)
      return false;
    }
    const cookieValue = JSON.parse(cookie)
    if (cookieValue.intervalMillis !== currentProbeIntervalMillis && cookieValue.createdAtMillis > TAB_CREATED_AT.getTime()) {
      logAsSessionProbe(`Found session probe cookie with different interval set. Current = ${currentProbeIntervalMillis}. New = ${cookieValue.intervalMillis}`)
      currentProbeIntervalMillis = cookieValue.intervalMillis
    }
    if (new Date().getTime() < cookieValue.createdAtMillis + currentProbeIntervalMillis) {
      logAsSessionProbe(`Session probe cookie valid`)
      return true
    }
    logAsSessionProbe(`Found invalid session probe cookie`)
    return false;
  }

  function getSessionProbe() {
    logAsSessionProbe(`Getting session probe ${new Date()}`)
    $.ajax({
      url: SESSION_PROBE_PATH,
      type: 'get',
      async: false,
      success: onSessionProbeSuccess,
      error: onSessionProbeFail
    });
  }

  function onSessionProbeSuccess(data) {
    logAsSessionProbe(`Session probe successful: ${JSON.stringify(data)}`);
    resetSessionProbeTimeouts(data);
    if (data.reload) {
      eventBus.publish(RELOAD_EVENT, '')
      reload()
    }
  }

  function resetSessionProbeTimeouts(data) {
    currentProbeIntervalMillis = data.intervalMillis
    const now = new Date().getTime();
    const beforeNextIntervalTick = new Date(now + currentProbeIntervalMillis - 1);
    const cookieValue = JSON.stringify({ createdAtMillis: now, intervalMillis: currentProbeIntervalMillis });
    Cookies.set(SESSION_PROBE_COOKIE_NAME, cookieValue, { expires: beforeNextIntervalTick })
    mutex.unlock()
    currentAttempt = 0
  }

  function onSessionProbeFail(err) {
    currentAttempt++
    logAsSessionProbe(`Session probe failed: ${err.status}. Attempt ${currentAttempt}/${MAX_ATTEMPTS}`);
    if (err.status === 401 || currentAttempt === MAX_ATTEMPTS) {
      mutex.unlock()
      eventBus.publish(LOGOUT_EVENT, ``)
      return redirectToLogout()
    }
    getSessionProbe()
  }

  function redirectToLogout() {
    const nextUrl = window.location.pathname + window.location.search + window.location.hash;
    const encodedNextUrl = encodeURIComponent(nextUrl);
    logAsSessionProbe(`Setting nextUrl param to: ${nextUrl}`);
    const redirectUri = `${BASE_LOGOUT_PATH}?${NEXT_URL_PARAM}=${encodedNextUrl}`;
    logAsSessionProbe(`Redirecting to: ${encodedNextUrl}`);
    window.location.href = redirectUri
  }

  function reload() {
    logAsSessionProbe(`Reloading the page`);
    window.location.reload(false)
  }

})()
