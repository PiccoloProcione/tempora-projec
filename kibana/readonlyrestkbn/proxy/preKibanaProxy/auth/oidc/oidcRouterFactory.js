"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.OidcRouterFactory=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var express=_interopRequireWildcard(require("express"));var _passportOpenidconnect=require("passport-openidconnect");var _oidcController=require("./oidcController");var _cookieParser=_interopRequireDefault(require("cookie-parser"));var _expressSession=_interopRequireDefault(require("express-session"));var _passport=require("passport");var _rorLoggerFactory=require("../../../core/logging/rorLoggerFactory");var _timeUtils=require("../../../core/common/timeUtils");var _cookieManager=require("../../../core/cookieManager");var PASSPORT_OIDC_STRATEGY="oidc";var OidcRouterFactory=function(){function p(e,r){(0,_classCallCheck2.default)(this,p);this.jwtSigner=e;this.legacyRenderer=r;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename)}(0,_createClass2.default)(p,[{key:"build",value:function e(a){var n=this;var r,o,t;var i=this.buildOidcStrategy(a);var l=p.buildOidcControllerConfig(a);var c=new _oidcController.OidcController(l,this.jwtSigner,this.legacyRenderer);var s=express.Router();var u=p.configurePassport(i);s.use(express.urlencoded({extended:true}));s.use((0,_cookieParser.default)());var g=(t=(o=(r=a.loginCallbackURL)===null||r===void 0?void 0:r.toLowerCase())===null||o===void 0?void 0:o.trim())===null||t===void 0?void 0:t.startsWith("https");var d=_cookieManager.CookieManager.getCookiesOptions({sameSite:'lax',secure:g});this.logger.trace("".concat(a.connectorName," will set a cookie valid for ").concat(_timeUtils.TimeUtils.nowPlusMillis(d.maxAge)," minutes."));s.use((0,_expressSession.default)({name:a.cookieConfig.name,secret:a.cookieConfig.password,cookie:d,resave:false,saveUninitialized:false,unset:'destroy'}));s.use(u.initialize());s.use(u.session());s.get(a.loginPath,u.authenticate(PASSPORT_OIDC_STRATEGY));s.use(a.loginCallbackPath,function(t,i,e){return u.authenticate(PASSPORT_OIDC_STRATEGY,{failureRedirect:'/'},function(e,r,o){if(!r){return n.handleLoginCallbackError(a,e,t,i,o)}t.user=r;return c.onLoginCallback(t,i)})(t,i)});s.use(a.logoutPath,c.onLogout);s.use(a.logoutCallbackPath,c.onLogoutCallback);return s}},{key:"handleLoginCallbackError",value:function e(r,o,t,i,a){this.logger.error("".concat(r.connectorName," error:"),o||a||i);t.logout();i.clearCookie(r.cookieConfig.name,{path:'/'});return i.send("<h2> There was an error in the OIDC connector ".concat(r.connectorName,"</h2> \n       <pre>").concat(o?o.message:JSON.stringify(a),"</pre>\n       <p>For more information, consult the kibana logs.</p>"))}},{key:"buildOidcStrategy",value:function e(r){var o=p.buildOidcStrategyConfig(r);this.logger.trace("Strategy config: "+JSON.stringify(o));return new _passportOpenidconnect.Strategy(o,function(e,r,o,t,i,a){_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename).debug("Obtained raw profile: "+JSON.stringify(o));return a(null,o)})}}],[{key:"buildOidcStrategyConfig",value:function e(r){return{scope:r.scope,issuer:r.issuer,userInfoURL:r.oidcUserInfoURL,authorizationURL:r.oidcAuthorizationURL,tokenURL:r.oidcTokenURL,clientID:r.clientId,clientSecret:r.clientSecret,logoutUrl:r.oidcLogoutUrl,callbackURL:r.loginCallbackURL}}},{key:"buildOidcControllerConfig",value:function e(r){return{connectorName:r.connectorName,usernameParameter:r.usernameParameter,groupsParameter:r.groupsParameter,cookieConfig:r.cookieConfig,logoutPath:r.logoutPath,logoutCallBackUrl:r.logoutCallbackUrl,oidcLogoutUrl:r.oidcLogoutUrl}}},{key:"configurePassport",value:function e(r){var o=new _passport.Passport;o.serializeUser(function(e,r){return r(null,e)});o.deserializeUser(function(e,r){return r(null,e)});o.use(PASSPORT_OIDC_STRATEGY,r);return o}}]);return p}();exports.OidcRouterFactory=OidcRouterFactory;