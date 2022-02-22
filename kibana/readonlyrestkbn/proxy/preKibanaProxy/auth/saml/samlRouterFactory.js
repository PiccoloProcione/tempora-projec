"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.SamlRouterFactory=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var express=_interopRequireWildcard(require("express"));var _passportSaml=require("passport-saml");var _samlController=require("./samlController");var _cookieParser=_interopRequireDefault(require("cookie-parser"));var _expressSession=_interopRequireDefault(require("express-session"));var _passport=require("passport");var _rorLoggerFactory=require("../../../core/logging/rorLoggerFactory");var _timeUtils=require("../../../core/common/timeUtils");var _cookieManager=require("../../../core/cookieManager");var PASSPORT_SAML_STRATEGY="saml";var SamlRouterFactory=function(){function c(e,r){(0,_classCallCheck2.default)(this,c);this.jwtSigner=e;this.legacyRenderer=r;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename)}(0,_createClass2.default)(c,[{key:"build",value:function e(r){var t,a;var o=this.buildSamlStrategy(r);var i=c.buildSamlControllerConfig(r);var l=new _samlController.SamlController(i,o,this.jwtSigner,this.legacyRenderer);var s=express.Router();var n=c.configurePassport(o);s.use(express.urlencoded({extended:true}));s.use((0,_cookieParser.default)());var u=_cookieManager.CookieManager.getCookiesOptions();u.secure=(a=(t=r.callbackURL)===null||t===void 0?void 0:t.toLowerCase())===null||a===void 0?void 0:a.trim().startsWith("https");this.logger.trace("".concat(r.connectorName," will set a cookie valid for ").concat(_timeUtils.TimeUtils.nowPlusMillis(u.maxAge)," minutes."));s.use((0,_expressSession.default)({name:r.cookieConfig.name,secret:r.cookieConfig.password,cookie:u,resave:false,saveUninitialized:false,unset:'destroy'}));s.use(n.initialize());s.use(n.session());s.get('metadata.xml',l.onGetMetadata);s.get(r.loginPath,n.authenticate(PASSPORT_SAML_STRATEGY));s.use(r.loginCallbackPath,n.authenticate(PASSPORT_SAML_STRATEGY,{failureRedirect:'/',failureFlash:true}),l.onLoginCallback);s.use(r.logoutPath,l.onLogout);s.use(r.logoutCallbackPath,l.onLogoutCallback);return s}},{key:"buildSamlStrategy",value:function e(r){var t=c.buildSamlStrategyConfig(r);this.logger.trace("Strategy config: "+JSON.stringify(t));return new _passportSaml.Strategy(t,function(e,r){_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename).debug("Obtained raw profile: "+JSON.stringify(e));r(null,e)})}}],[{key:"buildSamlStrategyConfig",value:function e(r){var t={protocol:r.protocol,entryPoint:r.entryPoint,issuer:r.issuer,callbackUrl:r.callbackURL,logoutCallbackUrl:r.logoutCallbackUrl,privateCert:r.privateCert,decryptionPvk:r.decryptionPvk};if(r.cert){t['cert']=r.cert}if(r.privateCert){t['privateCert']=r.privateCert}if(r.decryptionPvk){t['decryptionPvk']=r.decryptionPvk}return Object.assign(t,r.extraConfig)}},{key:"buildSamlControllerConfig",value:function e(r){return{connectorName:r.connectorName,usernameParameter:r.usernameParameter,groupsParameter:r.groupsParameter,cookieConfig:r.cookieConfig,logoutPath:r.logoutPath}}},{key:"configurePassport",value:function e(r){var t=new _passport.Passport;t.serializeUser(function(e,r){return r(null,e)});t.deserializeUser(function(e,r){return r(null,e)});t.use(r);return t}}]);return c}();exports.SamlRouterFactory=SamlRouterFactory;