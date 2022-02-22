"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.RorRequest=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _types=require("../common/types");var RorRequest=function(){function o(e,t,i,s,r,n,u,a){(0,_classCallCheck2.default)(this,o);this.cookies=e;this.method=t;this.path=i;this.params=s;this.url=r;this.headers=n;this.originAddress=u;this.body=a}(0,_createClass2.default)(o,[{key:"getAuthorizationHeaders",value:function e(){return this.identitySession.metadata.authorizationHeaders}},{key:"getCookies",value:function e(){return this.cookies}},{key:"getMethod",value:function e(){return this.method}},{key:"getPath",value:function e(){return this.path}},{key:"getUrl",value:function e(){return this.url}},{key:"getBody",value:function e(){return this.body}},{key:"getParams",value:function e(){return this.params}},{key:"getOriginAddress",value:function e(){return this.originAddress}},{key:"getHeaders",value:function e(){return this.headers}},{key:"isAuthenticated",value:function e(){return this.getIdentitySession()!=null}},{key:"isCookiePresent",value:function e(t){var i;return(i=this.cookies)===null||i===void 0?void 0:i.includes(t)}},{key:"getIdentitySession",value:function e(){return this.identitySession}},{key:"setIdentitySession",value:function e(t){this.identitySession=t}},{key:"lastSessionActivityDate",get:function e(){var t,i;return(i=(t=this.identitySession)===null||t===void 0?void 0:t.metadata)===null||i===void 0?void 0:i.lastSessionActivityDate}}]);return o}();exports.RorRequest=RorRequest;