"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.DistributionInfoProvider=exports.Environment=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _fs=require("fs");var editions={FREE:"free",ENTERPRISE:"enterprise",PRO:"pro"};var Environment;exports.Environment=Environment;(function(i){i[i["DEV"]=0]="DEV";i[i["PRODUCTION"]=1]="PRODUCTION"})(Environment||(exports.Environment=Environment={}));if(typeof atob==='undefined'){global.atob=function(i){return Buffer.from(i,'base64').toString('binary')}}var DistributionInfoProvider=function(){function DistributionInfoProvider(versionString){(0,_classCallCheck2.default)(this,DistributionInfoProvider);try{this._versionString=versionString;this._kibanaVersion=versionString.split("_es")[1];this._rorEdition=versionString.split("-")[0];this._rorVersion=versionString.substring(versionString.indexOf("-")+1).split("_")[0]}catch(i){throw new Error("Error parsing version string, error in parsing: "+i.message)}if(!this._versionString||!this._kibanaVersion||!this._rorEdition){throw new Error("Invalid version string, error in parsing: "+versionString)}try{eval(atob('aWYoZXZhbChhdG9iKCJNVFkwTlRReU16WTBPRGMyTnlBK0lEQWdKaVlnY0dGeWMyVkpiblFvWVhSdllpZ2lUVlJaTUU5RVJUUlBSRkY0VGtSRk5FMVJQVDBpS1NrZ1BDQW9ibVYzSUVSaGRHVW9LU2t1WjJWMFZHbHRaU2dwIikpKXt0aHJvdyBuZXcgRXJyb3IoYXRvYigiVW1WaFpHOXViSGxTUlZOVUlHWnZjaUJMYVdKaGJtRWdhR0ZzZEdWa0lHSmxZMkYxYzJVZ2VXOTFjaUIwY21saGJDQm9ZWE1nWlhod2FYSmxaQ3dnYjNJZ2RHaHBjeUJpZFdsc1pDQnBjeUIzWVhrZ2RHOXZJRzlzWkM0Z1IyVjBJSFJvWlNCc1lYUmxjM1FnWW5WcGJHUXNJRzl5SUdkbGRDQmhjM05wYzNSaGJtTmxJR0YwSUdGMElHaDBkSEJ6T2k4dmNtVmhaRzl1YkhseVpYTjBMbU52YlE9PSIpKX0='));this._isBuildExpired=false}catch(i){if(!i.message.includes("hal"+"ted")){console.log("Something went wrong in build expired..",i)}this._isBuildExpired=true}var env=DistributionInfoProvider.readPackageJson(__dirname+"/../../package.json").environment;this.environment=env==="PRODUCTION"?Environment.PRODUCTION:Environment.DEV}(0,_createClass2.default)(DistributionInfoProvider,[{key:"isBuildExpired",value:function i(){return this._isBuildExpired}},{key:"toString",value:function i(){return JSON.stringify({versionString:this._versionString,kibanaVersion:this._kibanaVersion,rorEdition:this._rorEdition,rorVersion:this._rorVersion,isProduction:Boolean(this.environment),isEnterprise:this.isEnterprise(),isPro:this.isPRO(),isFree:this.isFree(),isBuildExpired:this._isBuildExpired})}},{key:"isEnterprise",value:function i(){return editions.ENTERPRISE===this._rorEdition}},{key:"isPRO",value:function i(){return editions.PRO===this._rorEdition}},{key:"isFree",value:function i(){return editions.FREE===this._rorEdition}},{key:"isRorMoreAncientThan",value:function i(r){return this.isMoreAncientThan(this._rorVersion,r)}},{key:"isKibanaMoreAncientThan",value:function i(r){return this.isMoreAncientThan(this._kibanaVersion,r)}},{key:"isMoreAncientThan",value:function i(r,e){function n(i,r){var e,n;var t=/(\.0+)+$/;var o=i.replace(t,'').split('.');var s=r.replace(t,'').split('.');var a=Math.min(o.length,s.length);for(e=0;e<a;e++){n=parseInt(o[e],10)-parseInt(s[e],10);if(n){return n}}return o.length-s.length}return n(r,e)<0}},{key:"kibanaVersion",get:function i(){return this._kibanaVersion}},{key:"rorVersion",get:function i(){return this._rorVersion}},{key:"versionString",get:function i(){return this._versionString}},{key:"rorEdition",get:function i(){return this._rorEdition}},{key:"getEnvironment",get:function i(){return this.environment}}],[{key:"isEnvironmentDev",value:function i(){return this.getInstance().environment===Environment.DEV}},{key:"getInstance",value:function i(){if(!this.instance){try{var r=this.readPackageJson(__dirname+"/../../package.json");var e;if(r.ror_version&&r.ror_version.includes("_es")){e=r.ror_version}else{e="enterprise"+"-"+r.version+"_es"+r.kibana.version}this.instance=new DistributionInfoProvider(e)}catch(i){console.log(i);throw new Error("Cannot retrieve information from package.json. If this call comes from the browser, use StatusService.js instead."+i.message)}}return this.instance}},{key:"fromVersionString",value:function i(r){return new DistributionInfoProvider(r)}},{key:"readPackageJson",value:function i(r){var e=(0,_fs.readFileSync)(r,{encoding:'utf8',flag:'r'});return JSON.parse(e)}}]);return DistributionInfoProvider}();exports.DistributionInfoProvider=DistributionInfoProvider;