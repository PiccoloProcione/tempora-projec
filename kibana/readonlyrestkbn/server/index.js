"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.plugin=plugin;exports.config=void 0;var _plugin=require("./plugin");var _config=require("./config");if(typeof atob==='undefined'){global.atob=function(e){return Buffer.from(e,'base64').toString('binary')}}function plugin(e){return new _plugin.ReadonlyrestKbnPlugin(e)}var config={schema:_config.rorConfigSchema,exposeToBrowser:{clearSessionOnEvents:true,identity:true}};exports.config=config;