"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.parseSessionConfig=parseSessionConfig;var _defaultValues=require("../../server/defaultValues");function parseSessionConfig(e){var s=(e===null||e===void 0?void 0:e.sessions_probe_interval_seconds)||_defaultValues.DEFAULT_KIBANA_YAML_ROR_VALUES.sessions_probe_interval_seconds;return{timeoutMinutes:(e===null||e===void 0?void 0:e.session_timeout_minutes)||_defaultValues.DEFAULT_KIBANA_YAML_ROR_VALUES.session_timeout_minutes,probeIntervalMillis:s*1e3}}