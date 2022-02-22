"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.LegacyRenderer=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _types=require("../../core/common/types");var _templateCompiler=require("./template/templateCompiler");var _rorLoggerFactory=require("../../core/logging/rorLoggerFactory");var _logLevel=require("../../core/logging/logLevel");var _fs=_interopRequireDefault(require("fs"));var TEXT_HTML_UTF8="text/html; charset=utf-8";var TEXT_CSS_UTF8="text/css; charset=utf-8";var APPLICATION_JAVASCRIPT_UTF8="application/javascript; charset=UTF-8";var LegacyRenderer=function(){function a(e,t,r,n,i,s,o){var c=this;(0,_classCallCheck2.default)(this,a);this.basePath=e;this.legacySSOButtonProps=n;this.clearSessionOnEvents=i;this.loginPageCustomizations=s;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);this.renderLoginPage=function(e,t){var r=(0,_templateCompiler.compile)('./login_tpl.html',c.buildLoginTemplateArgs());t.setHeader(_types.CONTENT_TYPE_HEADER,TEXT_HTML_UTF8);return t.send(r)};this.renderLoginDeferredScript=function(e,t){return c.renderJs(t,(0,_templateCompiler.compile)('./login_tpl_defer.js',c.buildLoginTemplateArgs()))};this.renderSessionProbeInjection=function(e,t){return c.renderJs(t,(0,_templateCompiler.compile)("../../injection/scripts/sessionProbe.js",c.sessionProbeTemplateArgs))};this.renderCustomUserJsInjection=function(e,t){return c.renderJs(t,c.customJsInjection)};this.renderTrialExpirationAlert=function(e,t){var r=(0,_templateCompiler.compile)("../../injection/scripts/trialExpirationAlert.js",{});return c.renderJs(t,r)};this.renderSwitchGroup=function(e,t){var r=(0,_templateCompiler.compile)('./switch_group_tpl.html',c.buildSwitchGroupTemplateArgs());t.setHeader(_types.CONTENT_TYPE_HEADER,TEXT_HTML_UTF8);return t.send(r)};this.renderSwitchGroupDeferredScript=function(e,t){return c.renderJs(t,(0,_templateCompiler.compile)('./switch_group_tpl_defer.js',c.buildSwitchGroupTemplateArgs()))};this.renderHiddenAppsInjection=function(e,t){var r=e.rorRequest.getIdentitySession().metadata.kibanaHiddenApps;var n=r?r:[];var i={hiddenApps:[n.map(function(e){return"\"".concat(e,"\"")})],basePath:c.basePath,appRegistryPath:"".concat(c.basePath,"/pkp/api/kbn_app_registry")};var s=(0,_templateCompiler.compile)("../../injection/scripts/hiddenApps.js",i);return c.renderJs(t,s)};this.renderRorCssClassesInjection=function(e,t){var r=e.rorRequest.getIdentitySession().metadata;var n=r.kibanaHiddenApps;var i=n?n:[];var s=(0,_templateCompiler.compile)("../../injection/scripts/rorCssClasses.js",{username:r.username||'',currentGroup:r.currentGroup||'',kibanaAccess:r.kibanaAccess||'',hiddenApps:[i.map(function(e){return"\"".concat(e,"\"")})]});return c.renderJs(t,s)};this.renderJwtRedirect=function(e){return"<script src=\"".concat(c.basePath,"/pkp/autodeps?file=jquery/dist/jquery.min.js\"><\/script>\n    <script>\n    const nextUrl = window.sessionStorage.getItem(\"nextUrl\");\n    let loginRedirect = \"").concat(c.basePath,"/login\";\n    if (nextUrl) {\n        loginRedirect = loginRedirect + \"?nextUrl=\" + nextUrl\n    }\n    const destUrl = \"").concat(c.basePath,"/login\"\n    const jsonBodyAsString = '{\"").concat(_types.CONNECTOR_SVC_TRANSIENT_JWT,"\": \"").concat(e,"\"}'\n    \n    jQuery.ajax({\n      url: destUrl,\n      method: 'POST',\n      contentType : 'application/json',\n      dataType: \"json\",\n      data: jsonBodyAsString,\n      async: false\n    })\n    window.location.href = loginRedirect\n    <\/script>")};this.serveDependenciesAutomaticallyFromNodeModules=function(e,i){var s=e.query.file.toString();if((s===null||s===void 0?void 0:s.indexOf(".."))>=0){var t="You cannot navigate backwards..";c.logger.warn(t);return i.status(403).send(t)}var o=(__dirname+"/../../../node_modules/"+s).replace("//","/");c.logger.debug("Fetching frontend dependency: "+o);var r=function e(t,r){if(t){var n="Something went wrong with finding the dependency: "+t.message;c.logger.warn(n,t);return i.status(404).send(n)}if(o.endsWith(".js")){i.setHeader(_types.CONTENT_TYPE_HEADER,APPLICATION_JAVASCRIPT_UTF8)}else if(o.endsWith(".css")){i.setHeader(_types.CONTENT_TYPE_HEADER,TEXT_CSS_UTF8)}else{return i.status(403).send("File extension not allowed: "+s)}return i.send(r)};_fs.default.readFile(o,'utf8',function(e,t){try{r(e,t)}catch(e){c.logger.error("Autodeps failed to serve "+s,e)}});return i};this.renderJs=function(e,t){e.setHeader(_types.CONTENT_TYPE_HEADER,APPLICATION_JAVASCRIPT_UTF8);return e.send(t)};this.buildLoginTemplateArgs=function(e){var t,r,n,i;var s=(t=c.loginPageCustomizations)===null||t===void 0?void 0:t.title;var o=(r=c.loginPageCustomizations)===null||r===void 0?void 0:r.subtitle;var a=(n=c.loginPageCustomizations)===null||n===void 0?void 0:n.logoPath;var l=(i=c.loginPageCustomizations)===null||i===void 0?void 0:i.htmlHeadInject;return{message:e||"",basePath:c.basePath,kbnVersion:'7.8.0',logoutUrl:c.basePath+'/logout',loginUrl:c.basePath+'/login',ssoConnectors:JSON.stringify(c.legacySSOButtonProps),clearSessionOnEvents:JSON.stringify(c.clearSessionOnEvents),year:(new Date).getFullYear(),loginLogo:a?a:c.basePath+'/pkp/legacy/web/assets/readonlyrest_square_white.png',loginTitle:s||"",loginSubtitle:o||"",columns:!s&&!o?1:2,headInject:l||""}};this.buildSwitchGroupTemplateArgs=function(){return{basePath:c.basePath}};this.sessionProbeTemplateArgs={intervalMillis:t,sessionProbeUrl:"".concat(this.basePath,"/pkp/session-probe"),baseLogoutUrl:"".concat(this.basePath,"/logout"),sessionProbePrefix:"".concat(r),enableLogging:_rorLoggerFactory.RorLoggerFactory.isLoggingEnabled(_logLevel.LogLevel.DEBUG)};this.customJsInjection=a.buildCustomJsInjection(o)}(0,_createClass2.default)(a,[{key:"renderRedirect",value:function e(t){return"<script>console.log(\"redirecting to ".concat(t,"\"); window.location.href = '").concat(t,"'<\/script>")}}],[{key:"buildCustomJsInjection",value:function e(t){if(t==null){return''}return"\n    function waitWithCustomJsUntilKibanaHomeLoaded() {\n      const kibanaSpinner = $(\".kbnLoaderWrap\")\n      if (kibanaSpinner && kibanaSpinner.length) {\n        setTimeout(waitWithCustomJsUntilKibanaHomeLoaded, 300);\n      } else {\n        ".concat(t,"\n      }\n    }\n    waitWithCustomJsUntilKibanaHomeLoaded()\n    ")}}]);return a}();exports.LegacyRenderer=LegacyRenderer;