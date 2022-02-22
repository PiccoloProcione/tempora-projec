/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

const username = '${username}'
const currentGroup = '${currentGroup}'
const kibanaAccess = '${kibanaAccess}'
const hiddenAppsInRorCssClassesInjection = JSON.parse('[${hiddenApps}]')

function addRorBodyClasses() {
  const rorBodyClasses = ["ror-user_" + username]

  if (currentGroup !== '') {
    rorBodyClasses.push("ror-group_" + currentGroup)
  }

  if (kibanaAccess.toLowerCase().match('^ro')) {
    rorBodyClasses.push("ror-ro")
  }

  if (isKibanaManagementHidden()) {
    rorBodyClasses.push('ror_stack_management');
  }

  rorBodyClasses.forEach(cssClass => $('body').addClass(cssClass))
}

/**
 * We hide all inaccessible stack management navigation elements in public/assets/less/main.less, but it's still possible
 * to display tee elements and navigate them throughout stack management logic, since pre kibana proxy doesn't prevent a user
 * from navigation by frontend single page app routing system. We need to remove these elements completely from a DOM
 */
function removeStackManagementSubNavigationItems() {
  function detectWhenNavigationVisible() {
    const observer = new MutationObserver(() => {
      const navigation = $('.mgtSideBarNav');
      const navigationVisible = navigation.length
      const navigationModified = $('.ror_stack_management_navigation').length;

      if (navigationVisible && !navigationModified) {
        navigation.addClass('ror_stack_management_navigation')
        onNavigationVisible();
      }
    })

    observer.observe(document, { subtree: true, childList: true });
  }

  detectWhenNavigationVisible()

  function onNavigationVisible() {
    if (location.pathname.startsWith('/app/management/')) {
      $('.euiSideNavItemButton--isClickable').each((index, value) => {
        if(['reporting', 'indexPatterns', 'objects'].includes(value.dataset.testSubj)) {
          return;
        }
        $(value).remove();
      });
    }
  }
}

function isKibanaManagementHidden() {
  return (
    Array.isArray(hiddenAppsInRorCssClassesInjection) &&
    hiddenAppsInRorCssClassesInjection.some((hiddenApp) =>
      "Management|Stack Management".startsWith(hiddenApp)
    )
  );
}

function isStackManagementHidden() {
  return (
    hiddenAppsInRorCssClassesInjection &&
    (hiddenAppsInRorCssClassesInjection.includes('kibana:management') ||
      hiddenAppsInRorCssClassesInjection.includes('management')) &&
    window.location.href.includes('/app/management')
  );
}

function waitWithRorBodyClassesUntilKibanaHomeLoaded() {
  const kibanaSpinner = $(".kbnLoaderWrap")
  if (kibanaSpinner && kibanaSpinner.length) {
    setTimeout(waitWithRorBodyClassesUntilKibanaHomeLoaded, 300);
  } else {
    addRorBodyClasses()
  }
}
waitWithRorBodyClassesUntilKibanaHomeLoaded()
