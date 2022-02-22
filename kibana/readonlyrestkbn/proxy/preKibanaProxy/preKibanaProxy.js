"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.PreKibanaProxy=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _express=_interopRequireDefault(require("express"));var _tcpPortUsed=_interopRequireDefault(require("tcp-port-used"));var _authenticationFacade=require("./authenticationFacade");var _identityController=require("./api/controller/identityController");var _cors=_interopRequireDefault(require("cors"));var _morgan=_interopRequireDefault(require("morgan"));var _configurationController=require("./api/controller/configurationController");var _pkpApiRouter=require("./api/router/pkpApiRouter");var _authorizationHeadersCollector=require("../core/authorization/authorizationHeadersCollector");var _jwtSigner=require("./auth/jwtSigner");var _samlRouterConfigFactory=require("./auth/saml/samlRouterConfigFactory");var _samlRouterFactory=require("./auth/saml/samlRouterFactory");var _legacyRenderer=require("./auth/legacyRenderer");var _distributionInfoProvider=require("../../kibana/patchers/distributionInfoProvider");var _oidcRouterConfigFactory=require("./auth/oidc/oidcRouterConfigFactory");var _oidcRouterFactory=require("./auth/oidc/oidcRouterFactory");var _authController=require("./auth/authController");var _tenancyController=require("./auth/tenancyController");var _proxyBuilder=require("./proxyBuilder");var _serverCreator=require("./serverCreator");var _rorLoggerFactory=require("../core/logging/rorLoggerFactory");var _cookieParser=_interopRequireDefault(require("cookie-parser"));var _htmlInjector=require("./injection/htmlInjector");var _rorRequestAppender=require("../core/rorRequestAppender");var _logoutLinkProvider=require("./auth/logoutLinkProvider");var _auditLogEmitter=require("./auditLogEmitter");var _whitelistedPathsController=require("./auth/whitelistedPathsController");var _directAccessProxyBuilder=require("./directAccessProxyBuilder");var __awaiter=void 0&&(void 0).__awaiter||function(e,s,r,n){function h(t){return t instanceof r?t:new r(function(e){e(t)})}return new(r||(r=Promise))(function(t,r){function i(e){try{o(n.next(e))}catch(e){r(e)}}function a(e){try{o(n["throw"](e))}catch(e){r(e)}}function o(e){e.done?t(e.value):h(e.value).then(i,a)}o((n=n.apply(e,s||[])).next())})};var PreKibanaProxy=function(){function c(e,t,r,i,a){var o=this;(0,_classCallCheck2.default)(this,c);var s,n;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);this.withBasePath=function(e){return o.params.kibanaBasePath+e};this.app=(0,_express.default)();this.isReservedPath=new RegExp('^'+a.kibanaBasePath+'(/pkp.*|/log(in|out)|/switch-group)');this.params=a;this.serverCreator=new _serverCreator.ServerCreator(this.params.kibanaSSLConfig);var h=new _authorizationHeadersCollector.AuthorizationHeadersCollector(this.params.proxyAuth,this.params.requestHeadersWhitelist,this.params.jwtQueryParam,(s=this.params.auth)===null||s===void 0?void 0:s.signatureKey);var u=new _authenticationFacade.AuthenticationFacade(e,t,this.params.kibanaIndex,i,h,this.params.kibanaTemplateIndexSurplusRemovalEnabled,this.params.kibanaTemplateIndex);this.configurationController=new _configurationController.ConfigurationController(i);this.identityController=new _identityController.IdentityController;this.auditLogEmitter=new _auditLogEmitter.AuditLogEmitter(i);this.samlRouterConfigs=new _samlRouterConfigFactory.SamlRouterConfigFactory(this.params.kibanaBasePath,this.params.cookieConfig).constructFrom(this.params.auth);this.oidcRouterConfigs=new _oidcRouterConfigFactory.OidcRouterConfigFactory(this.params.kibanaBasePath,this.params.cookieConfig).constructFrom(this.params.auth);this.legacyRenderer=new _legacyRenderer.LegacyRenderer(this.params.kibanaBasePath,this.params.sessionConfig.probeIntervalMillis,this.params.cookieConfig.name,c.buildSSOButtonProps(this.samlRouterConfigs,this.oidcRouterConfigs),this.params.clearSessionOnEvents,this.params.loginPageCustomizations,(n=this.params.customUXCodeInjection)===null||n===void 0?void 0:n.js);var l=new _logoutLinkProvider.LogoutLinkProvider(this.params.kibanaBasePath,this.samlRouterConfigs,this.oidcRouterConfigs,this.params.customLogoutLink,this.params.proxyAuth);this.authController=new _authController.AuthController(this.params.kibanaBasePath,this.params.proxyAuth,u,l,this.auditLogEmitter,this.params.cookieConfig,this.params.sessionConfig.probeIntervalMillis,this.params.customLoginLink);this.tenantController=new _tenancyController.TenancyController(this.params.kibanaBasePath,u,this.params.cookieConfig);this.proxy=this.buildProxy();var p=new _directAccessProxyBuilder.DirectAccessProxyBuilder(this.params.kibanaUrl,this.params.pkpKibanaToken).build();this.whitelistedPathsController=new _whitelistedPathsController.WhitelistedPathsController(this.params.whitelistedPaths,p);this.pkpApiRouter=(0,_pkpApiRouter.buildPkpApiRouter)(i);this.rorRequestAppender=r;this.init()}(0,_createClass2.default)(c,[{key:"close",value:function e(){this.server.close()}},{key:"buildProxy",value:function e(){var t,r;var i,a;i=(t=this.params.customUXCodeInjection)===null||t===void 0?void 0:t.css;a=(r=this.params.customUXCodeInjection)===null||r===void 0?void 0:r.cssFileContent;var o=new _htmlInjector.HtmlInjector(this.params.kibanaBasePath,i,a);return new _proxyBuilder.ProxyBuilder(this.params.kibanaUrl,this.params.pkpKibanaToken,o).build()}},{key:"init",value:function e(){var i=this;this.app.disable('x-powered-by');this.initDevInterceptors();this.app.use(function(e,t,r){if(!i.isReservedPath.test(e.path)){return r()}return _express.default.json({limit:"500gb"})(e,t,r)});this.app.use(this.whitelistedPathsController.handleWhitelistedPaths);this.app.use((0,_cookieParser.default)());this.app.use(_rorRequestAppender.RorRequestAppender.appendRorRequest);this.app.use(this.authController.handleApiReqWithCredentialsOnboard);this.app.use(this.rorRequestAppender.appendIdentitySession);if(this.params.proxyAuth.enabled){this.app.use(this.authController.handleProxyAuth)}this.initSSORouters();this.app.use(this.withBasePath("/pkp/legacy/web"),_express.default.static(__dirname+"/../../public"));this.app.get(this.withBasePath("/pkp/autodeps"),this.legacyRenderer.serveDependenciesAutomaticallyFromNodeModules);this.app.get(this.withBasePath("/login"),this.authController.redirectAuthenticated);this.app.get(this.withBasePath("/login"),this.authController.handleCustomLoginRedirection);this.app.get(this.withBasePath("/login"),this.legacyRenderer.renderLoginPage);this.app.get(this.withBasePath("/pkp/legacy/web/assets/js/login_tpl_defer.js"),this.legacyRenderer.renderLoginDeferredScript);this.app.post(this.withBasePath("/login"),this.authController.handleLoginPost);this.app.get(this.withBasePath("/logout"),this.authController.handleLogout);this.app.get(this.withBasePath("/pkp/session-probe"),this.authController.handleSessionProbe);this.app.use(this.authController.redirectUnauthenticated);this.app.use(this.authController.refreshSession);this.app.get(this.withBasePath("/switch-group"),this.handleSwitchGroup.bind(this));this.app.get(this.withBasePath("/pkp/legacy/web/assets/js/switch_group_tpl_defer.js"),this.legacyRenderer.renderSwitchGroupDeferredScript);this.app.use(this.withBasePath("/pkp/api"),this.pkpApiRouter);this.app.use(this.withBasePath("/pkp/web"),_express.default.static(__dirname+"/../../web-app/build"));this.app.get(this.withBasePath("/pkp/injections/custom.js"),this.legacyRenderer.renderCustomUserJsInjection);this.app.get(this.withBasePath("/pkp/injections/hidden-apps.js"),this.legacyRenderer.renderHiddenAppsInjection);this.app.get(this.withBasePath("/pkp/injections/ror-css-classes.js"),this.legacyRenderer.renderRorCssClassesInjection);this.app.get(this.withBasePath("/pkp/injections/session-probe.js"),this.legacyRenderer.renderSessionProbeInjection);this.app.get(this.withBasePath("/pkp/injections/trial-expiration-alert.js"),this.legacyRenderer.renderTrialExpirationAlert);this.app.use(this.proxy);this.launch()}},{key:"handleSwitchGroup",value:function e(r,i,a){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:t.next=2;return this.tenantController.handleEncryptCookieOnSwitchGroup(r,i,a);case 2:this.legacyRenderer.renderSwitchGroup(r,i);case 3:case"end":return t.stop()}}},e,this)}))}},{key:"initDevInterceptors",value:function e(){if(_distributionInfoProvider.DistributionInfoProvider.isEnvironmentDev()){this.app.use("/*",(0,_cors.default)({origin:true,credentials:true}));this.app.use((0,_morgan.default)('PKP :method :url :status :response-time ms - :res[content-length]'))}}},{key:"initSSORouters",value:function e(){var t=this;var r,i;if(this.samlRouterConfigs.length==0&&this.oidcRouterConfigs.length==0){return}var a=new _jwtSigner.JwtSigner((i=(r=this.params)===null||r===void 0?void 0:r.auth)===null||i===void 0?void 0:i.signatureKey,this.params.sessionConfig.timeoutMinutes);var o=new _samlRouterFactory.SamlRouterFactory(a,this.legacyRenderer);var s=new _oidcRouterFactory.OidcRouterFactory(a,this.legacyRenderer);this.samlRouterConfigs.forEach(function(e){t.logger.info("Adding SAML SSO at \"".concat(e.routerPath,"\" path"));t.app.use(e.routerPath,o.build(e))});this.oidcRouterConfigs.forEach(function(e){t.logger.info("Adding OIDC SSO at \"".concat(e.routerPath,"\" path"));t.app.use(e.routerPath,s.build(e))})}},{key:"launch",value:function e(){var t=this;var r=this.params.pkpHostAndPort,i=r.host,a=r.port;_tcpPortUsed.default.check(a,i).then(function(r){return __awaiter(t,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:if(!r){_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename).trace("Pre-kibana-proxy will listen on http://".concat(i,":").concat(a));this.server=this.serverCreator.createServer(this.app,this.params.pkpHostAndPort)}case 1:case"end":return t.stop()}}},e,this)}))})}}],[{key:"buildSSOButtonProps",value:function e(t,r){return t.map(function(e){return e.toLegacySsoButtonProps()}).concat(r.map(function(e){return e.toLegacySsoButtonProps()}))}}]);return c}();exports.PreKibanaProxy=PreKibanaProxy;