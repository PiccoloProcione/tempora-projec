/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

const A_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const POPUP_THRESHOLD_IN_DAYS = 33
const TRIAL_EXPIRATION_DATE = (() => {
  try {
    // This string placeholder is replaced by Gulp when building a package
    return Number.parseInt("1648188414181")
  } catch (e) {
    // Fallback value adopted in development
    return new Date(new Date().getTime() + A_DAY_IN_MILLISECONDS * POPUP_THRESHOLD_IN_DAYS)
  }
})()
const TIME_UNTIL_TRIAL_EXPIRATION = new Date(TRIAL_EXPIRATION_DATE).getTime() - new Date().getTime()
const DAYS_UNTIL_TRIAL_EXPIRATION = Math.ceil(TIME_UNTIL_TRIAL_EXPIRATION / A_DAY_IN_MILLISECONDS);

/**
 * We need to add sessionStorage ignoreTrialInfo for automatic tests purposes as a workaround of https://github.com/cypress-io/cypress/issues/4158
 * When we reload a page, for example on tenancy change, cypress is not able to close alert automatically and, we cannot do it programmatically
 * since the window browser object changed and we are not able to subscribe to specific onAlert event. The result is, that tests hung and we need to close the alert manually
 * What is not the best option in case of automatic tests
 */
const manuallyIgnoreTrialAlert = sessionStorage.getItem('ror:ignoreTrialInfo') !== "true"
const showTrialAlert = DAYS_UNTIL_TRIAL_EXPIRATION < POPUP_THRESHOLD_IN_DAYS && manuallyIgnoreTrialAlert
if (showTrialAlert) {
  window.alert(`ReadonlyREST trial build (${DAYS_UNTIL_TRIAL_EXPIRATION} ${DAYS_UNTIL_TRIAL_EXPIRATION > 1 ? "days" : "day"} left).\n
ReadonlyREST plugins for Kibana are non-free. This is a time-limited but full-featured trial build for your evaluation.\
 Visit https://readonlyrest.com for more information.\n
If you are already a subscriber and your payment went through, uninstall this plugin and download the full version from https://readonlyrest.com/download`)
}
