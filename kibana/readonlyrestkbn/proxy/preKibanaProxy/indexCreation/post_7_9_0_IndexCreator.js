"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.Post_7_9_0_IndexCreator=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _indexCreator=require("./indexCreator");function _createSuper(a){var i=_isNativeReflectConstruct();return function e(){var t=(0,_getPrototypeOf2.default)(a),r;if(i){var n=(0,_getPrototypeOf2.default)(this).constructor;r=Reflect.construct(t,arguments,n)}else{r=t.apply(this,arguments)}return(0,_possibleConstructorReturn2.default)(this,r)}}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}var __awaiter=void 0&&(void 0).__awaiter||function(e,u,r,o){function s(t){return t instanceof r?t:new r(function(e){e(t)})}return new(r||(r=Promise))(function(t,r){function n(e){try{i(o.next(e))}catch(e){r(e)}}function a(e){try{i(o["throw"](e))}catch(e){r(e)}}function i(e){e.done?t(e.value):s(e.value).then(n,a)}i((o=o.apply(e,u||[])).next())})};var Post_7_9_0_IndexCreator=function(e){(0,_inherits2.default)(u,e);var i=_createSuper(u);function u(e,t,r,n){var a;(0,_classCallCheck2.default)(this,u);a=i.call(this,e,t,__filename,r,n);a.defaultKibanaIndex=e;a.esClient=t;return a}(0,_createClass2.default)(u,[{key:"createKibanaIndex",value:function e(u){return __awaiter(this,void 0,void 0,_regenerator.default.mark(function e(){var r,n,a,i;return _regenerator.default.wrap(function e(t){while(1){switch(t.prev=t.next){case 0:t.next=2;return this.getDefaultIndexMapping();case 2:r=t.sent;n=Object.keys(r)[0];a=r[n].mappings;i={mappings:{properties:a.properties}};this.logger.debug("kibana_index resolution: default=".concat(this.defaultKibanaIndex,", fromSession=").concat(u,", willBeCreated=").concat(u));this.logger.debug("Creating kibana index ".concat(u," with mappings from ").concat(this.defaultKibanaIndex,": PUT ").concat(JSON.stringify(i).substring(0,50),"..."));t.next=10;return this.esClient.putAsKibana(u,i);case 10:case"end":return t.stop()}}},e,this)}))}}]);return u}(_indexCreator.IndexCreator);exports.Post_7_9_0_IndexCreator=Post_7_9_0_IndexCreator;