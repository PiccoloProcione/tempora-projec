"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.InMemorySessionManager=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _sessionManager=require("./sessionManager");function _createSuper(i){var s=_isNativeReflectConstruct();return function e(){var t=(0,_getPrototypeOf2.default)(i),r;if(s){var n=(0,_getPrototypeOf2.default)(this).constructor;r=Reflect.construct(t,arguments,n)}else{r=t.apply(this,arguments)}return(0,_possibleConstructorReturn2.default)(this,r)}}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}var __awaiter=void 0&&(void 0).__awaiter||function(e,a,r,u){function o(t){return t instanceof r?t:new r(function(e){e(t)})}return new(r||(r=Promise))(function(t,r){function n(e){try{s(u.next(e))}catch(e){r(e)}}function i(e){try{s(u["throw"](e))}catch(e){r(e)}}function s(e){e.done?t(e.value):o(e.value).then(n,i)}s((u=u.apply(e,a||[])).next())})};var InMemorySessionManager=function(e){(0,_inherits2.default)(n,e);var r=_createSuper(n);function n(e){var t;(0,_classCallCheck2.default)(this,n);t=r.call(this);t.sessionTimeoutMillis=e;t.sessions=new Map;t.set=function(r,n){return __awaiter((0,_assertThisInitialized2.default)(t),void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:this.sessions.set(r,n);this.mostRecentlyAccessed=n;case 2:case"end":return t.stop()}}},e,this)}))};t.get=function(n){return __awaiter((0,_assertThisInitialized2.default)(t),void 0,void 0,_regenerator.default.mark(function e(){var r;return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:r=this.sessions.get(n);if(r!=null){this.mostRecentlyAccessed=r}return t.abrupt("return",r?r:null);case 3:case"end":return t.stop()}}},e,this)}))};t.delete=function(e){t.sessions.delete(e)};t.checkIfSessionTimeout=function(r){return __awaiter((0,_assertThisInitialized2.default)(t),void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:t.next=2;return this.isSessionTimeout(r);case 2:if(!t.sent){t.next=5;break}this.sessions.delete(r);return t.abrupt("return",true);case 5:return t.abrupt("return",false);case 6:case"end":return t.stop()}}},e,this)}))};return t}return n}(_sessionManager.SessionManager);exports.InMemorySessionManager=InMemorySessionManager;