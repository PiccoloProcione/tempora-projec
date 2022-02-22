"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.KibanaAppsRegistry=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _rorLoggerFactory=require("../../core/logging/rorLoggerFactory");var _hiddenAppsChecker=_interopRequireDefault(require("./hiddenAppsChecker"));var KibanaAppsRegistry=function(){function s(){(0,_classCallCheck2.default)(this,s)}(0,_createClass2.default)(s,null,[{key:"app2capabilities",value:function e(a){var i=this;return this.registry.filter(function(e){return i.expressionMatchesAppId(a,e.id)}).map(function(e){return e.flags}).reduce(function(e,a){return e.concat(a)},[])}},{key:"enrichRegistry",value:function e(a){var i=this;a.map(function(a){if(!i.registry.find(function(e){return e.id===a.id})){s.logger.info("Found new kibana app, adding to registry ",a);i.registry.push(a)}})}},{key:"isNavigationAllowed",value:function e(a,i){if(i.length===0){s.logger.trace("No hidden apps configured for identity");return true}var t=s.getAppByPath(a);if(!t){s.logger.trace("Cannot extract app name from request path: ",a);return true}s.logger.trace("Matched app from path: ".concat(a),t.id);var r=this.getAppsByIdOrPartialId(i);s.logger.trace("Hidden apps for user",r.map(function(e){return e.id}));if(r.find(function(e){return e.id===t.id})){s.logger.trace("Current app \"".concat(t.id,"\" is hidden. Hence, will NOT allow navigation."));return false}return true}},{key:"getAppsByIdOrPartialId",value:function e(a){var i=a.map(function(a){return s.registry.filter(function(e){return e.id.startsWith(a)})});return[].concat.apply([],i)}},{key:"getAppByPath",value:function e(a){return s.registry.find(function(e){return a.startsWith(e.path)})}},{key:"expressionMatchesAppId",value:function e(a,i){return(0,_hiddenAppsChecker.default)(a,i)}}]);return s}();exports.KibanaAppsRegistry=KibanaAppsRegistry;KibanaAppsRegistry.registry=[{id:"Analytics|Overview",path:"/app/kibana_overview",flags:[]},{id:"Analytics|Discover",path:"/app/discover",flags:["discover"]},{id:"Analytics|Dashboard",path:"/app/dashboards",flags:["dashboards","dashboard"]},{id:"Analytics|Canvas",path:"/app/canvas",flags:["canvas"]},{id:"Analytics|Maps",path:"/app/maps",flags:["maps"]},{id:"Analytics|Machine Learning",path:"/app/ml",flags:["ml","ml_file_data_visualizer"]},{id:"Analytics|Visualize Library",path:"/app/visualize",flags:["visualize"]},{id:"Enterprise Search|Overview",path:"/app/enterprise_search/overview",flags:["enterpriseSearch"]},{id:"Enterprise Search|App Search",path:"/app/enterprise_search/app_search",flags:["appSearch"]},{id:"Enterprise Search|Workplace Search",path:"/app/enterprise_search/workplace_search",flags:["workplaceSearch"]},{id:"Observability|Overview",path:"/app/observability",flags:["observability-overview"]},{id:"Observability|Logs",path:"/app/logs",flags:["logs"]},{id:"Observability|Metrics",path:"/app/metrics",flags:["metrics"]},{id:"Observability|APM",path:"/app/apm",flags:["apm"]},{id:"Observability|Uptime",path:"/app/uptime",flags:["uptime"]},{id:"Observability|User Experience",path:"/app/ux",flags:["ux"]},{id:"Security|Overview",path:"/app/security/overview",flags:["siem","securitySolution"]},{id:"Security|Detections",path:"/app/security/detections",flags:["siem","securitySolution"]},{id:"Security|Hosts",path:"/app/security/hosts",flags:["siem","securitySolution","securitySolution:administration","securitySolution:case","securitySolution:detections","securitySolution:hosts","securitySolution:network","securitySolution:overview","securitySolution:timelines"]},{id:"Security|Network",path:"/app/security/network",flags:["siem","securitySolution"]},{id:"Security|Timelines",path:"/app/security/timelines",flags:["siem","securitySolution"]},{id:"Security|Cases",path:"/app/security/cases",flags:["siem","securitySolution"]},{id:"Security|Administration",path:"/app/security/administration",flags:["siem","securitySolution"]},{id:"Management|Dev Tools",path:"/app/dev_tools",flags:["dev_tools"]},{id:"Management|Fleet",path:"/app/fleet",flags:["fleet"]},{id:"Management|Integrations",path:"/app/integrations",flags:["integrations"]},{id:"Management|Stack Management",path:"/app/management",flags:["management"]}];KibanaAppsRegistry.logger=_rorLoggerFactory.RorLoggerFactory.getLoggerForFile(__filename);