"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.HiddenAppsTransformer=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _index=require("../index");var _rorLoggerFactory=require("../../../../core/logging/rorLoggerFactory");var HiddenAppsTransformer=function(){function i(){(0,_classCallCheck2.default)(this,i)}(0,_createClass2.default)(i,null,[{key:"transform",value:function e(r,a){var t=(0,_index.getCapabilitiesToRemove)(a);var n=function e(a,r){return(0,_index.mutateAllCapabilitiesInObject)(r[a],function(r){var e=!Boolean(t.find(function(e){return e===r}));e||i.logger.trace("Disabling capability ".concat(a,".").concat(r));return e})};n("navLinks",r);n("catalogue",r);return r}}]);return i}();exports.HiddenAppsTransformer=HiddenAppsTransformer;HiddenAppsTransformer.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);