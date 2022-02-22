"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.redirectToPkpMiddleware=redirectToPkpMiddleware;var rorStore=require('./rorStore');function getProtocol(r){var e,o;if(r.headers['x-forwarded-proto']){return r.headers['x-forwarded-proto']}if((o=(e=r.connection)===null||e===void 0?void 0:e.info)===null||o===void 0?void 0:o.protocol){return r.connection.info.protocol}return r.server.info.protocol}function buildRedirectUrl(r){var e=r.url.path||r.url.pathname;var o=new URL(getProtocol(r)+'://'+r.info.host+e);o.port=rorStore.getPkpPort().toString();return o.toString()}function hasValidPkpKibanaToken(r){return r.headers["x-ror-pkp-kibana-token"]===rorStore.getPkpKibanaToken()}function redirectToPkpMiddleware(r,e){if(!hasValidPkpKibanaToken(r)){return e.redirect(buildRedirectUrl(r)).takeover()}return e.continue}