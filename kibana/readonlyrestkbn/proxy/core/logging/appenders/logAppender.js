"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.LogAppender=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _logLevel=require("../logLevel");var LogAppender=function(){function e(){(0,_classCallCheck2.default)(this,e)}(0,_createClass2.default)(e,[{key:"logPattern",value:function e(r,t,l){var a=(0,_logLevel.getLogFormattedTime)();var o=(0,_logLevel.getLogLevelDescription)(r);return"[".concat(a,"] [").concat(o,"][plugins][ReadonlyREST][").concat(t,"] ").concat(l)}}]);return e}();exports.LogAppender=LogAppender;