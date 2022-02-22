"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.IndexCreator=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _rorLoggerFactory=require("../../core/logging/rorLoggerFactory");var _tenantIndexBasedOnTemplateApplier=require("./indexTemplating/tenantIndexBasedOnTemplateApplier");var __awaiter=void 0&&(void 0).__awaiter||function(e,s,t,u){function o(r){return r instanceof t?r:new t(function(e){e(r)})}return new(t||(t=Promise))(function(r,t){function n(e){try{i(u.next(e))}catch(e){t(e)}}function a(e){try{i(u["throw"](e))}catch(e){t(e)}}function i(e){e.done?r(e.value):o(e.value).then(n,a)}i((u=u.apply(e,s||[])).next())})};var IndexCreator=function(){function i(e,r,t,n,a){(0,_classCallCheck2.default)(this,i);this.defaultKibanaIndex=e;this.esClient=r;this.esClient=r;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(t);this.defaultKibanaIndex=e;this.indexTemplateApplier=new _tenantIndexBasedOnTemplateApplier.TenantIndexBasedOnTemplateApplier(r,n,a)}(0,_createClass2.default)(i,[{key:"createIndexIfNecessary",value:function e(t,n){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return this.doesIndexExist(t);case 2:if(r.sent){r.next=6;break}this.logger.debug("Kibana index ".concat(t," did not exist"));r.next=6;return this.createKibanaIndex(t);case 6:r.next=8;return this.indexTemplateApplier.applyTemplateToIndex(t,n);case 8:case"end":return r.stop()}}},e,this)}))}},{key:"getDefaultIndexMapping",value:function e(){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t,n,a;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return this.esClient.getAsKibana(this.defaultKibanaIndex+"/_mapping");case 2:t=r.sent;r.next=5;return t.json();case 5:n=r.sent;a=n["error"];if(!a){r.next=13;break}if(!(n["status"]===404)){r.next=11;break}this.logger.debug("Kibana index mappings not found");return r.abrupt("return",null);case 11:this.logger.error("Error in reading kibana index mappings: ",n);throw new Error(JSON.stringify(n));case 13:this.logger.debug("Mappings extracted from default kibana index (".concat(this.defaultKibanaIndex,"):"),JSON.stringify(n).substring(0,30)+"...");return r.abrupt("return",n);case 15:case"end":return r.stop()}}},e,this)}))}},{key:"doesIndexExist",value:function e(n){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return this.esClient.headAsKibana(n);case 2:t=r.sent;return r.abrupt("return",t.status===200);case 4:case"end":return r.stop()}}},e,this)}))}}]);return i}();exports.IndexCreator=IndexCreator;