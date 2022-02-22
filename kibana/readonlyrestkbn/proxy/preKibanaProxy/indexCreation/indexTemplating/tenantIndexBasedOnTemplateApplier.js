"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.TenantIndexBasedOnTemplateApplier=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _rorLoggerFactory=require("../../../core/logging/rorLoggerFactory");var _templateIndexSurplusRemover=require("./templateIndexSurplusRemover");var __awaiter=void 0&&(void 0).__awaiter||function(e,o,t,l){function u(r){return r instanceof t?r:new t(function(e){e(r)})}return new(t||(t=Promise))(function(r,t){function n(e){try{i(l.next(e))}catch(e){t(e)}}function a(e){try{i(l["throw"](e))}catch(e){t(e)}}function i(e){e.done?r(e.value):u(e.value).then(n,a)}i((l=l.apply(e,o||[])).next())})};var TenantIndexBasedOnTemplateApplier=function(){function n(e,r,t){(0,_classCallCheck2.default)(this,n);this.esClient=e;this.templateIndexFromConfig=t;this.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);this.templateIndexSurplusRemover=new _templateIndexSurplusRemover.TemplateIndexSurplusRemover(e)}(0,_createClass2.default)(n,[{key:"applyTemplateToIndex",value:function e(a,i){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var t,n;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:t=i||this.templateIndexFromConfig;if(!(t==null)){r.next=4;break}this.logger.info('Template index not defined. Returning');return r.abrupt("return",Promise.resolve());case 4:if(!(t===a)){r.next=7;break}this.logger.info('Template and target indices are the same. Aborting reindexing.');return r.abrupt("return",Promise.resolve());case 7:r.prev=7;r.next=10;return this.copyAllDocumentsFromTemplateTo(a,t);case 10:n=r.sent;return r.abrupt("return",this.templateIndexSurplusRemover.removeFromTargetDocumentsMissingInTemplate(n,a,t));case 14:r.prev=14;r.t0=r["catch"](7);this.handleErrors(r.t0,a,t);case 17:case"end":return r.stop()}}},e,this,[[7,14]])}))}},{key:"copyAllDocumentsFromTemplateTo",value:function e(t,n){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:this.logger.info("Copying all Kibana objects from '".concat(n,"' to '").concat(t,"'"));return r.abrupt("return",this.esClient.postAsKibana('_reindex',JSON.stringify({source:{index:n},dest:{index:t,version_type:"internal"}})).then(function(e){return e.json()}).then(function(e){return e.total}));case 2:case"end":return r.stop()}}},e,this)}))}},{key:"handleErrors",value:function e(r,t,n){var a;if((a=r.message)===null||a===void 0?void 0:a.includes('index_not_found_exception')){this.logger.warn("Template index was not found, won't copy anything")}else{this.logger.error("Reindexing for '".concat(t,"' based on template index '").concat(n,"' failed: ").concat(JSON.stringify(r)),r)}}}]);return n}();exports.TenantIndexBasedOnTemplateApplier=TenantIndexBasedOnTemplateApplier;