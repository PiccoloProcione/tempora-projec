"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.KibanaAppRegistryController=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _rorLoggerFactory=require("../../../core/logging/rorLoggerFactory");var _kibanaAppsRegistry=require("../../kibana_apps/kibanaAppsRegistry");var __awaiter=void 0&&(void 0).__awaiter||function(e,o,t,s){function u(r){return r instanceof t?r:new t(function(e){e(r)})}return new(t||(t=Promise))(function(r,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function n(e){try{i(s["throw"](e))}catch(e){t(e)}}function i(e){e.done?r(e.value):u(e.value).then(a,n)}i((s=s.apply(e,o||[])).next())})};var KibanaAppRegistryController=function(){function e(){(0,_classCallCheck2.default)(this,e);this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename)}(0,_createClass2.default)(e,[{key:"handlePost",value:function e(t,a){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.prev=0;this.logger.trace("Received app registry payload of length "+t.body.length);_kibanaAppsRegistry.KibanaAppsRegistry.enrichRegistry(t.body);return r.abrupt("return",a.json({message:"ok"}));case 6:r.prev=6;r.t0=r["catch"](0);a.status(500);this.logger.error("Error enriching kibana app registry from request: ".concat(r.t0.name,": ").concat(r.t0.message),r.t0);return r.abrupt("return",a.json({message:r.t0.message}));case 11:case"end":return r.stop()}}},e,this,[[0,6]])}))}}]);return e}();exports.KibanaAppRegistryController=KibanaAppRegistryController;