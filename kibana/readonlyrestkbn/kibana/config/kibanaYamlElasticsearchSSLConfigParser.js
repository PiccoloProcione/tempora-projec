"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.parseSSLConfig=parseSSLConfig;var _rorLoggerFactory=require("../../proxy/core/logging/rorLoggerFactory");var _configUtils=require("./configUtils");var logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);function parseSSLConfig(r,o){var e,i;var t=isSSLEnabled(o);var s=r===null||r===void 0?void 0:r.ssl;var a=(s===null||s===void 0?void 0:s.certificateAuthorities)&&singleToAnArray(s.certificateAuthorities);var n=(e=s===null||s===void 0?void 0:s.truststore)===null||e===void 0?void 0:e.path;var l=(i=s===null||s===void 0?void 0:s.truststore)===null||i===void 0?void 0:i.password;var v=s===null||s===void 0?void 0:s.verificationMode;return{sslEnabled:t,certificateAuthorities:a,truststorePath:n,truststorePassword:l,verificationMode:v}}var isSSLEnabled=function r(o){var e=o[0].split("://")[0];o.forEach(function(r){if(r.split('://')[0]!==e){logger.error("The Elasticsearch hosts provided use different protocols. Please use either http or https for all hosts.");(0,_configUtils.exitInOneSecond)()}});return e==='https'};var singleToAnArray=function r(o){return Array.isArray(o)?o:[o]};