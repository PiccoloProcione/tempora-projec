"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.InterceptionFacade=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _errors=_interopRequireDefault(require("../constants/errors"));var __awaiter=void 0&&(void 0).__awaiter||function(e,s,n,o){function u(r){return r instanceof n?r:new n(function(e){e(r)})}return new(n||(n=Promise))(function(r,n){function t(e){try{i(o.next(e))}catch(e){n(e)}}function a(e){try{i(o["throw"](e))}catch(e){n(e)}}function i(e){e.done?r(e.value):u(e.value).then(t,a)}i((o=o.apply(e,s||[])).next())})};var InterceptionFacade=function(){function u(e,r,n){(0,_classCallCheck2.default)(this,u);this.kibanaIndex=r;this.reportingIndex=n;this.sessionManager=e}(0,_createClass2.default)(u,[{key:"replaceIndicesInPath",value:function e(i){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var n,t,a;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return this.replaceIndicesKibanaIndexSource(i);case 2:n=r.sent;t=n.source;a=n.kibanaIndex;r.t0=t;r.next=r.t0==='kibanaIndexFromSession'?8:r.t0==='kibanaIndexFromMostRecentlyAccessedSession'?8:r.t0==='PreElasticsearchProxyParams'?9:r.t0==='noKibanaIndexToReplace'?10:11;break;case 8:return r.abrupt("return",this.replaceKibanaIndexOccurrencesWithTenantIndex(i.getUrl(),a));case 9:return r.abrupt("return",u.normalizeKibanaIndexToMinimalForm(i.getUrl(),a));case 10:return r.abrupt("return",i.getUrl());case 11:throw new Error(_errors.default.wrongTypeOfIndicesSource);case 12:case"end":return r.stop()}}},e,this)}))}},{key:"replaceIndicesInBody",value:function e(i,s){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var n,t,a;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return this.replaceIndicesKibanaIndexSource(s);case 2:n=r.sent;t=n.source;a=n.kibanaIndex;r.t0=t;r.next=r.t0==='kibanaIndexFromSession'?8:r.t0==='kibanaIndexFromMostRecentlyAccessedSession'?8:r.t0==='PreElasticsearchProxyParams'?9:r.t0==='noKibanaIndexToReplace'?10:11;break;case 8:return r.abrupt("return",Buffer.from(this.replaceKibanaIndexOccurrencesWithTenantIndex(i.toString(),a)));case 9:return r.abrupt("return",Buffer.from(u.normalizeKibanaIndexToMinimalForm(i.toString(),a)));case 10:return r.abrupt("return",i);case 11:throw new Error(_errors.default.wrongTypeOfIndicesSource);case 12:case"end":return r.stop()}}},e,this)}))}},{key:"replaceKibanaIndexOccurrencesWithTenantIndex",value:function e(r,n){var t=u.replaceSubstringIfNotAlreadyPresent(r,this.kibanaIndex,n);var a=u.replaceSubstringIfNotAlreadyPresent(t,this.reportingIndex,this.reportingIndex+n);return u.normalizeKibanaIndexToMinimalForm(a,n)}},{key:"getKibanaIndexFromMostRecentlyAccessedSession",value:function e(){var r=this.sessionManager.getMostRecentlyAccessed();return r===null||r===void 0?void 0:r.kibanaIndex}},{key:"replaceIndicesKibanaIndexSource",value:function e(s){var o;return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var n,t,a,i;return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:r.next=2;return u.getKibanaIndexFromSession(s);case 2:n=r.sent;if(!n){r.next=5;break}return r.abrupt("return",{source:'kibanaIndexFromSession',kibanaIndex:n});case 5:t=(o=s.getIdentitySession())===null||o===void 0?void 0:o.metadata;if(!t){r.next=8;break}return r.abrupt("return",{source:'PreElasticsearchProxyParams',kibanaIndex:this.kibanaIndex});case 8:a=s.getUrl().includes(this.reportingIndex);if(!a){r.next=13;break}i=this.getKibanaIndexFromMostRecentlyAccessedSession();if(!i){r.next=13;break}return r.abrupt("return",{source:'kibanaIndexFromMostRecentlyAccessedSession',kibanaIndex:i});case 13:return r.abrupt("return",{source:'noKibanaIndexToReplace',kibanaIndex:undefined});case 14:case"end":return r.stop()}}},e,this)}))}}],[{key:"replaceSubstringIfNotAlreadyPresent",value:function e(r,n,t){if(r.includes(t)){return r}return r.split(n).join(t)}},{key:"normalizeKibanaIndexToMinimalForm",value:function e(r,n){var t=n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');var a=new RegExp(t+"_((\\d){1,2}).((\\d){1,2})\\.(\\d){1,2}_(\\d){3}","gm");var i=new RegExp(t+"_((\\d){1,2}).((\\d){1,2})\\.(\\d){1,2}","gm");return r.replace(a,n).replace(i,n)}},{key:"getKibanaIndexFromSession",value:function e(n){var t,a;return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){return _regenerator.default.wrap(function e(r){while(1){switch(r.prev=r.next){case 0:return r.abrupt("return",(a=(t=n.getIdentitySession())===null||t===void 0?void 0:t.metadata)===null||a===void 0?void 0:a.kibanaIndex);case 1:case"end":return r.stop()}}},e)}))}}]);return u}();exports.InterceptionFacade=InterceptionFacade;