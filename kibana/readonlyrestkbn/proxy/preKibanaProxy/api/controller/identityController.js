"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.IdentityController=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _identity=require("../../identity");var _rorLoggerFactory=require("../../../core/logging/rorLoggerFactory");var __awaiter=void 0&&(void 0).__awaiter||function(e,o,t,u){function l(r){return r instanceof t?r:new t(function(e){e(r)})}return new(t||(t=Promise))(function(r,t){function n(e){try{i(u.next(e))}catch(e){t(e)}}function a(e){try{i(u["throw"](e))}catch(e){t(e)}}function i(e){e.done?r(e.value):l(e.value).then(n,a)}i((u=u.apply(e,o||[])).next())})};var IdentityController=function(){function e(){(0,_classCallCheck2.default)(this,e);this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename)}(0,_createClass2.default)(e,[{key:"handleGet",value:function e(a,i){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t,n;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:t=a.getIdentitySession().metadata;n=new _identity.Identity(t.username,t.kibanaHiddenApps,t.kibanaAccess,t.currentGroup,t.availableGroups);this.logger.trace("returning identity metadata ",JSON.stringify(n,null,2));i.json(n);case 4:case"end":return r.stop()}}},e,this)}))}}]);return e}();exports.IdentityController=IdentityController;