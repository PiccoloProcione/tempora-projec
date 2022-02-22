/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

// Let's have our own scope, so we don't leak variables and functions into global scope
(function hiddenAppsScope() {
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function logWithContext(...params) {
    params.unshift("[ROR|hiddenApps] ")
    console.log.apply(console, params)
  }

  const TRIGGER_DELAY_MS = 300
  const APP_IDS_TO_BE_HIDDEN = IsJsonString('[${hiddenApps}]') ?
    JSON.parse(String.raw`[${hiddenApps}]`.replace("\\", "\\\\") )
    : []
  console.log('hiddenApps', APP_IDS_TO_BE_HIDDEN)
  let ALL_MENU_APPS = new Map()
  let FOUND_MENU_APPS_TO_BE_HIDDEN = []
  let ALREADY_NOTIFIED = false

  // This selector is tested and works from 7.9.0 to 7.11.1 <--- #UPDATE_ME
  const DOM_MENU_ELEMENTS_SELECTOR = '[data-test-subj*="collapsibleNavGroup-"]';
  const DOM_SIDEBAR_TOGGLE_BUTTON_SELECTOR = "[aria-label*='Toggle primary navigation']"
  const RECENT_ACTIONS_GROUP_NAME = "recently";

  function buildAppMetadata(appElement, groupName) {
    const href = appElement.attr('href')
    return {
      id: groupName + "|" + appElement.text(),
      name: appElement.text(),
      groupName: groupName,
      href: href,
      path: new URL(href).pathname
    }
  }

  function printAllMenuApps() {
    logWithContext("=========== Apps ROR can hide =============")
    ALL_MENU_APPS.forEach((appMetadata, appId) => logWithContext(`${appId} => ${appMetadata.path}`))
    logWithContext("===========================================")
    logWithContext("Apps array for kibanaAppRegistry.ts", ALL_MENU_APPS.entries())
  }

  function notifyUserAboutMalformedExpressions(invalidAppIds) {
    if (!ALREADY_NOTIFIED && invalidAppIds.length > 0) {
      alert(`Impossible to hide specified apps: ${JSON.stringify(invalidAppIds)} these IDs are wrong or outdated, see documentation.`)
      ALREADY_NOTIFIED = true
    }
  }

  function appendCSStoDOM(cssSelectorsArray) {
    if (cssSelectorsArray.size === 0) {
      return
    }
    const selectorsString = cssSelectorsArray.join(", ")
    logWithContext(`Final CSS selector string ${selectorsString}`)
    // noinspection HtmlDeprecatedAttribute
    $(`
      <style type="text/css">
        ${selectorsString} {
          display: none;
        }
      </style>
    `)
      .appendTo("head")
  }

  function expressionMatchesAppId(expression, appId) {
    function parseRegexpFromStringBasedRegexpValue() {
      const expressionWithoutRegexStartEndSymbols = expression.substr(1).slice(0, -1)
      const expressionWithEscapeValues = expressionWithoutRegexStartEndSymbols
      return  new RegExp(expressionWithEscapeValues)
    }

    function parseRegexpFromString() {
      const startWithRegex = new RegExp(expression.replace('|', '\\|') + '.*');
      return startWithRegex
    }

    const isRegexExpression = expression.startsWith('/') && expression.endsWith('/')
    let regExp;

    if(isRegexExpression) {
      regExp = parseRegexpFromStringBasedRegexpValue()
    } else {
      regExp = parseRegexpFromString()
    }

    return XRegExp.test(appId, regExp)
  }

  function shouldHideApp(appId, appIdsToBeHidden) {
    return Boolean(appIdsToBeHidden.find(expression => expressionMatchesAppId(expression, appId)))
  }

  function computeEmptyGroupNames(survivorAppIds) {
    const groupNames = [...new Set(
      [...ALL_MENU_APPS.values()]
        .map(v => v.groupName))]
    logWithContext(`Groups found ${groupNames}`)

    const emptyOnes = groupNames.filter(groupName => !survivorAppIds.find(id => id.startsWith(groupName)))
    logWithContext(`Empty groups found ${emptyOnes}`)
    return emptyOnes
  }

  function computeGroupHideSelector(groupName) {
    // Normal algorithm for transforming submenu (aka group) UI label names (as seen by the user) into CSS submenu selector
    let transformedName = groupName.replaceAll(" ", "")
    transformedName = transformedName.charAt(0).toLowerCase() + transformedName.slice(1);

    // Some exceptions to be handled to the above, for some specific submenus. This is because the submenu selector follows the kibana plugin name (as seen in kibana.json), and the label may vary.
    if (transformedName === "security") {
      transformedName = "securitySolution"
    }
    if (transformedName === "analytics") {
      transformedName = "kibana"
    }
    return `[data-test-subj="collapsibleNavGroup-${transformedName}"]`
  }

  function computeAppHideSelector(appMetadata) {
    return `a[href*="${appMetadata.href}"], li[url="${appMetadata.path}"]`
  }

  function getCssSelectorsToHide() {
    const survivorAppIds = [...ALL_MENU_APPS.keys()].filter(id => !shouldHideApp(id, APP_IDS_TO_BE_HIDDEN))
    const emptyGroupsNames = computeEmptyGroupNames(survivorAppIds)

    const appsToHide = [...ALL_MENU_APPS.values()].filter(appMetadata => !survivorAppIds.includes(appMetadata.id))
    FOUND_MENU_APPS_TO_BE_HIDDEN = [].concat(appsToHide)
    logWithContext(`Will hide apps: ${appsToHide.map(_ => _.id)}`)

    const unusedExpressions = APP_IDS_TO_BE_HIDDEN
      .filter(
        expression => expression !== "readonlyrest_kbn" && !appsToHide.find(appMetadata => expressionMatchesAppId(expression, appMetadata.id))
      )
    if (unusedExpressions && unusedExpressions.length) {
      logWithContext(`Malformed expressions that did not match any app to hide: ${unusedExpressions}`)
      //notifyUserAboutMalformedExpressions(unusedExpressions)
    }
    const groupsToHideSelectors = emptyGroupsNames.map(computeGroupHideSelector)
    const appToHideSelectors = appsToHide.map(computeAppHideSelector)
    return groupsToHideSelectors.concat(appToHideSelectors)
  }

  function harvestAvailableAppsFromNav() {
    $(DOM_MENU_ELEMENTS_SELECTOR).each((_, menuGroup) => {
      if ($(menuGroup).text().toLowerCase().includes(RECENT_ACTIONS_GROUP_NAME)) {
        return
      }
      const groupName = $(menuGroup).find('.euiTitle').text()
      $(menuGroup).find('a')
        .map((_, app) => buildAppMetadata($(app), groupName))
        .each((_, appMetadata) => ALL_MENU_APPS.set(appMetadata.id, appMetadata));
    })
  }

  function ensureNavBarState(desiredState) {
    const navToggleButton = $(DOM_SIDEBAR_TOGGLE_BUTTON_SELECTOR)
    if (navToggleButton.length === 0) {
      return false
    }
    const isOpen = navToggleButton.attr('aria-expanded') === "true"
    const shouldToggle = desiredState !== isOpen
    const stateForLogging = desiredState ? "opened" : "closed"
    if (shouldToggle) {
      navToggleButton.click()
      logWithContext(`Successfully ${stateForLogging} nav bar`)
    } else {
      logWithContext(`Nav bar was already ${stateForLogging}`)
    }
    return shouldToggle
  }

  function executeWhenAppsListAvailable(callBack) {
    const logAndReschedule = (logMessage) => {
      logWithContext(logMessage)
      return setTimeout(() => executeWhenAppsListAvailable(callBack), TRIGGER_DELAY_MS)
    }

    if ($(DOM_SIDEBAR_TOGGLE_BUTTON_SELECTOR).length === 0) {
      return logAndReschedule("Toggle button not present yet, delaying...")
    }

    ensureNavBarState(true)
    if ($(DOM_MENU_ELEMENTS_SELECTOR).length === 0) {
      return logAndReschedule("Toggle button present, but can't harvest kibana apps, delaying...")
    }

    harvestAvailableAppsFromNav()
    if (ALL_MENU_APPS.size > 0) {
      callBack()
      ensureNavBarState(false)
      return
    }
    return logAndReschedule("Menu apps and toggle button were present, but we could not harvest kibana apps. Will try again, delaying...")
  }

  // TODO this should be done on pkp level
  function prohibitNavigationIfNeeded() {
    const pathname = window.location.pathname
    FOUND_MENU_APPS_TO_BE_HIDDEN.forEach((appMetadata) => {
      if (pathname.indexOf(appMetadata.path) >= 0) {
        logWithContext(`Cannot navigate to ${pathname} because ${appMetadata.name} app is hidden`)
        window.location.replace("${basePath}/")
      }
    })
  }

  function sendAppsToRegistry(appsArray) {
    $.ajax({
      url: "${appRegistryPath}",
      type: "post",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(appsArray),
      processData: false,
      dataType: "json",
      async: false,
      success: (data) => console.log("success send apps to registry", data),
      error: (err) => console.log("cannot send apps to registry", err)
    })
  }

  executeWhenAppsListAvailable(() => {
    printAllMenuApps()
    const cssSelectorsForHiding = getCssSelectorsToHide()
    appendCSStoDOM(cssSelectorsForHiding)
    prohibitNavigationIfNeeded()
    const asArrayOfObjects = Array.from(ALL_MENU_APPS.values())
    sendAppsToRegistry(asArrayOfObjects)
  })

  // For testing hidden app functionality purpose
  if (typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
    module.exports = {
      shouldHideApp
    };
  }
})()
