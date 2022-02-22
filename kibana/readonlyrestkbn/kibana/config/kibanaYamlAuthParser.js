"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.parseAuthConfiguration=parseAuthConfiguration;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));var _rorLoggerFactory=require("../../proxy/core/logging/rorLoggerFactory");var _fs=_interopRequireDefault(require("fs"));var AUTH_SIGNATURE_KEY="signature_key";var logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);var SSO_TYPE;(function(r){r[r["SAML"]=0]="SAML";r[r["OIDC"]=1]="OIDC"})(SSO_TYPE||(SSO_TYPE={}));function hasUndefinedValues(r,e){var o=false;Object.entries(e).forEach(function(r){var e=(0,_slicedToArray2.default)(r,2),t=e[0],n=e[1];if(n==null){logger.warn("Missing value for pathToObject.".concat(t,": ").concat(n));o=true}});return o}function readFileFromAbsolutePath(r,e){if(!e){return null}if(!e.startsWith("/")){var t="".concat(r," should be configured as an absolute path");logger.error(t);throw new Error(t)}if(!_fs.default.existsSync(e)){var n="File not found ".concat(e," for configuration parameter ").concat(r);logger.error(n);throw new Error(n)}var o=null;try{o=_fs.default.readFileSync(e).toString()}catch(r){this.logger.error('Error reading from file: '+e,r);throw r}return o}function buildSAMLConfig(r,t){var e={name:r,enabled:t["enabled"]==null?true:!!t["enabled"],buttonName:t["buttonName"]==null?"":t["buttonName"],issuer:t["issuer"]==null?'ror':t["issuer"],entryPoint:t["entryPoint"],logoutUrl:t["logoutUrl"],kibanaExternalHost:t["kibanaExternalHost"],protocol:t["protocol"]==null?'http':t["protocol"],usernameParameter:t["usernameParameter"]==null?'nameID':t["usernameParameter"],groupsParameter:t["groupsParameter"]==null?'memberOf':t["groupsParameter"]};if(hasUndefinedValues("readonlyrest_kbn.auth.".concat(r),e)){this.logger.warn("Missing SAML configuration for ".concat(r),t);return null}["cert","decryptionPvk","privateCert"].filter(function(r){return t[r]}).forEach(function(r){return e[r]=readFileFromAbsolutePath(r,t[r])});e.extraConfig=Object.keys(t).filter(function(r){return!e.hasOwnProperty(r)}).reduce(function(r,e){r[e]=t[e];return r},{});return e}function buildOIDCConfig(r,e){var t={name:r,enabled:e["enabled"]==null?true:!!e["enabled"],buttonName:e["buttonName"]==null?"":e["buttonName"],issuer:e["issuer"]==null?'ror':e["issuer"],kibanaExternalHost:e["kibanaExternalHost"],protocol:e["protocol"]==null?'http':e["protocol"],tokenURL:e["tokenURL"],authorizationURL:e["authorizationURL"],userInfoURL:e["userInfoURL"],logoutUrl:e["logoutUrl"],clientId:e["clientID"],clientSecret:e["clientSecret"],scope:e["scope"],usernameParameter:e["usernameParameter"]==null?'nameID':e["usernameParameter"],groupsParameter:e["groupsParameter"]==null?'memberOf':e["groupsParameter"]};var n=hasUndefinedValues("readonlyrest_kbn.auth.".concat(r),t);return n?null:t}function parseAuthConfiguration(r){var e=null;if(!r||!r.auth){return null}var t=r.auth[AUTH_SIGNATURE_KEY];var i=[];var l=[];Object.entries(r.auth).filter(function(r){var e=(0,_slicedToArray2.default)(r,2),t=e[0],n=e[1];return t!==AUTH_SIGNATURE_KEY}).forEach(function(r){var e=(0,_slicedToArray2.default)(r,2),t=e[0],n=e[1];if(!n||!n["type"]){logger.warn("Missing config type for readonlyrest_kbn.auth.".concat(t));return}var o=SSO_TYPE[n["type"].toString().toUpperCase()];logger.info("parsing auth config: ".concat(t," of SSO_TYPE: ").concat(o));if(o===undefined){logger.warn("Unknown config type \"".concat(n["type"].toString(),"\" for readonlyrest_kbn.auth.").concat(t));return}if(o===SSO_TYPE.SAML){var a=buildSAMLConfig(t,n);if(a){i.push(a);return}}var u=buildOIDCConfig(t,n);if(u){l.push(u)}});e={signatureKey:t,samlConfigurations:i,oidcConfigurations:l};return e}