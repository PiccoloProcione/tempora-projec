"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.buildSettingsRouter=buildSettingsRouter;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var express=_interopRequireWildcard(require("express"));var _configurationController=require("../controller/configurationController");var __awaiter=void 0&&(void 0).__awaiter||function(e,o,t,a){function c(r){return r instanceof t?r:new t(function(e){e(r)})}return new(t||(t=Promise))(function(r,t){function n(e){try{i(a.next(e))}catch(e){t(e)}}function u(e){try{i(a["throw"](e))}catch(e){t(e)}}function i(e){e.done?r(e.value):c(e.value).then(n,u)}i((a=a.apply(e,o||[])).next())})};function buildSettingsRouter(e){var r=this;var t=express.Router();var u=new _configurationController.ConfigurationController(e);t.get("/",function(t,n){return __awaiter(r,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return u.handleGetConfiguration(t.rorRequest,n);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}},e)}))});t.post("/",function(t,n){return __awaiter(r,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return u.handlePostConfiguration(t.rorRequest,n);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}},e)}))});t.get("/file",function(t,n){return __awaiter(r,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return u.handleGetConfigurationFile(t.rorRequest,n);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}},e)}))});return t}