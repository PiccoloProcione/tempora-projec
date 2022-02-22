"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getCookieConfig=getCookieConfig;exports.parseRorConfig=parseRorConfig;var _kibanaYamlAuthParser=require("./kibanaYamlAuthParser");var _configGenerator=require("./configGenerator");var _kibanaYamlWhitelistedPathsParser=require("./kibanaYamlWhitelistedPathsParser");var _types=require("../../proxy/core/common/types");var _kibanaYamlCustomUXCodeInjectionParser=require("./kibanaYamlCustomUXCodeInjectionParser");var _kibanaYamlSessionManagerConfigParser=require("./kibanaYamlSessionManagerConfigParser");var _kibanaYamlLoginPageCustomizationsParser=require("./kibanaYamlLoginPageCustomizationsParser");var _kibanaYamlSessionConfigParser=require("./kibanaYamlSessionConfigParser");var _defaultValues=require("../../server/defaultValues");function getCookieConfig(e){var a=e.cookieName,o=e.password,r=e.sslEnabled,i=e.secureCookies;var n=a||_defaultValues.DEFAULT_KIBANA_YAML_ROR_VALUES.cookieName;var s=i||r;if(s){return{name:"".concat(n,"_secure"),password:o,secure:true}}return{name:n,password:o,secure:false}}function parseRorConfig(e){var a,o,r;var i=e.readonlyrest_kbn,n=e.server,s=e.xpack;var t=(i===null||i===void 0?void 0:i.cookiePass)||(0,_configGenerator.generateRandomCookiePassword)();var l=(i===null||i===void 0?void 0:i.pkpKibanaToken)||(0,_configGenerator.generateRandomToken)();var u=(0,_kibanaYamlAuthParser.parseAuthConfiguration)(i);var d=(0,_kibanaYamlSessionConfigParser.parseSessionConfig)(i);var v=(0,_kibanaYamlCustomUXCodeInjectionParser.parseCustomUxCodeInjection)(i);var g=i===null||i===void 0?void 0:i.custom_logout_link;var m=i===null||i===void 0?void 0:i.custom_login_link;var k={enabled:(i===null||i===void 0?void 0:i.proxy_auth_passthrough)&&!!i.proxy_auth_passthrough||false,forward_auth_header:(i===null||i===void 0?void 0:i.forward_auth_header)||_types.X_FORWARDED_USER};var C={value:(i===null||i===void 0?void 0:i.jwt_query_param)||"jwt"};var _=(0,_kibanaYamlWhitelistedPathsParser.getWhiteListedPaths)(i);var c=(0,_kibanaYamlLoginPageCustomizationsParser.parseLoginPageCustomizations)(i);var f=getCookieConfig({cookieName:i===null||i===void 0?void 0:i.cookieName,password:t,sslEnabled:(a=n===null||n===void 0?void 0:n.ssl)===null||a===void 0?void 0:a.enabled,secureCookies:(o=s===null||s===void 0?void 0:s.security)===null||o===void 0?void 0:o.secureCookies});var p=i===null||i===void 0?void 0:i.kibanaIndexTemplate;var P=(i===null||i===void 0?void 0:i.kibanaIndexTemplateRemoveUserObjects)||false;var b=(r=i===null||i===void 0?void 0:i.clearSessionOnEvents)!==null&&r!==void 0?r:[];return{sessionManagerConfig:(0,_kibanaYamlSessionManagerConfigParser.parseSessionManagerConfig)(i),cookiePassword:t,pkpKibanaToken:l,authConfig:u,sessionConfig:d,customUXCodeInjection:v,customLogoutLink:g,customLoginLink:m,proxyAuthConfig:k,jwtQueryParam:C,whitelistedPaths:_,loginPageCustomizations:c,cookieConfig:f,kibanaTemplateIndex:p,kibanaTemplateIndexSurplusRemovalEnabled:P,clearSessionOnEvents:b}}