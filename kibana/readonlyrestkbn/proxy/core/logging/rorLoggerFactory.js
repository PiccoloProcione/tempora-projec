"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.RorLoggerFactory=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _rorLogger=require("./rorLogger");var _logLevel=require("./logLevel");var _path=_interopRequireDefault(require("path"));var _consoleAppender=require("./appenders/consoleAppender");var _fileAppender=require("./appenders/fileAppender");var RorLoggerFactory=function(){function t(){(0,_classCallCheck2.default)(this,t)}(0,_createClass2.default)(t,null,[{key:"getLoggerForFile",value:function e(r){return t.getLogger(_path.default.parse(r).name)}},{key:"setAppender",value:function e(r,o){switch(r===null||r===void 0?void 0:r.type){case'file':{return new _fileAppender.FileAppender(o,r.path)}default:{return new _consoleAppender.ConsoleAppender(o)}}}},{key:"setDestination",value:function e(r){switch(r){case'stdout':case undefined:{t.logger.debug("Setting log destination to: console");return{type:'console'}}default:{t.logger.debug("Setting log destination to: ".concat(r," folder"));return{type:'file',path:r}}}}},{key:"getLogger",value:function e(r){var o=this.loggers.get(r);if(o!=null){return o}return new _rorLogger.RorLogger(this.setAppender(t.destination,r))}},{key:"initLogs",value:function e(r,o){t.CURRENT_LOG_LEVEL=r;t.destination=t.setDestination(o);t.logger.debug("Setting logLevel to: "+_logLevel.LogLevel[r])}},{key:"isLoggingEnabled",value:function e(r){return t.CURRENT_LOG_LEVEL.valueOf()>=r.valueOf()}}]);return t}();exports.RorLoggerFactory=RorLoggerFactory;RorLoggerFactory.DEFAULT_LOG_LEVEL=_logLevel.LogLevel.INFO;RorLoggerFactory.CURRENT_LOG_LEVEL=RorLoggerFactory.DEFAULT_LOG_LEVEL;RorLoggerFactory.loggers=new Map;RorLoggerFactory.logger=RorLoggerFactory.getLogger('LoggerFactory');