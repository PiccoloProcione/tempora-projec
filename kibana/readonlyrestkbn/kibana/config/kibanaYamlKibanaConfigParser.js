"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.parseKibanaConfigForPkp=parseKibanaConfigForPkp;exports.parseKibanaConfigForPep=parseKibanaConfigForPep;var _kibanaYamlKibanaSSLConfigParser=require("./kibanaYamlKibanaSSLConfigParser");var DEFAULT_KIBANA_INDEX=".kibana";var CUSTOM_KIBANA_PORT_OFFSET=10;var CUSTOM_PEP_PORT_OFFSET=20;var DEFAULT_KIBANA_PORT=5601;var RANDOM_KIBANA_PORT=5611;var RANDOM_PEP_PORT=5621;var DEFAULT_REPORTING_INDEX=".reporting";var DEFAULT_REQUEST_TIMEOUT_MS=3e4;var DEFAULT_PING_TIMEOUT_MS=DEFAULT_REQUEST_TIMEOUT_MS;function asValidPortNumber(r){if(typeof r=="string"&&!/^[1-9][0-9]*$/.test(String(r))){throw new Error("The port value is invalid: ".concat(r))}var a=+r;if(isNaN(a)){throw new Error("The port value is not numeric: ".concat(r))}if(Math.floor(a)!==a){throw new Error("The port number is not an integer ".concat(r))}if(a<0||a>65536){throw new Error("The port number is  out of range".concat(r))}return a}function parseKibanaConfigForPkp(r){var a,e,i;var o=((a=r.server)===null||a===void 0?void 0:a.host)||"localhost";var n=(e=r.server)===null||e===void 0?void 0:e.port;var t=n?asValidPortNumber(n)+CUSTOM_KIBANA_PORT_OFFSET:RANDOM_KIBANA_PORT;var v=((i=r.server)===null||i===void 0?void 0:i.basePath)||"";var T=n?asValidPortNumber(n):DEFAULT_KIBANA_PORT;var s={host:o,port:T};var _=(0,_kibanaYamlKibanaSSLConfigParser.parseKibanaSSLConfig)(r);var l="http://localhost:"+asValidPortNumber(t);return{pkpHostAndPort:s,kibanaUrl:l,kibanaBasePath:v,kibanaIndex:getKibanaIndex(r),newKibanaPort:t,kibanaSslConfig:_}}function parseKibanaConfigForPep(r,a){var e,i,o,n,t;var v=(e=r.server)===null||e===void 0?void 0:e.port;var T=v?asValidPortNumber(v)+CUSTOM_PEP_PORT_OFFSET:RANDOM_PEP_PORT;var s="http://localhost:"+asValidPortNumber(T);var _=((o=(i=r.xpack)===null||i===void 0?void 0:i.reporting)===null||o===void 0?void 0:o.index)||DEFAULT_REPORTING_INDEX;var l=((n=r.elasticsearch)===null||n===void 0?void 0:n.pingTimeout)||DEFAULT_PING_TIMEOUT_MS;var P=((t=r.elasticsearch)===null||t===void 0?void 0:t.requestTimeout)||DEFAULT_REQUEST_TIMEOUT_MS;return{pepPort:T,pepUrl:s,networkParameters:{pingTimeout:l,requestTimeout:P},reportingIndex:_,kibanaIndex:getKibanaIndex(r),kibanaTechUserEsCredentials:a}}function getKibanaIndex(r){var a;return((a=r.kibana)===null||a===void 0?void 0:a.index)||DEFAULT_KIBANA_INDEX}