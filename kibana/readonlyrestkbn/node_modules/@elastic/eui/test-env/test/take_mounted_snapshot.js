"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeMountedSnapshot = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Use this function to generate a Jest snapshot of components that have been fully rendered
 * using Enzyme's `mount` method. Typically, a mounted component will result in a snapshot
 * containing both React components and HTML elements. This function removes the React components,
 * leaving only HTML elements in the snapshot.
 */
var takeMountedSnapshot = function takeMountedSnapshot(mountedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = _objectSpread({
    hasArrayOutput: false
  }, options);

  var html = mountedComponent.html();
  var template = document.createElement('template');
  template.innerHTML = html;
  var snapshot = template.content.firstChild;

  if (opts.hasArrayOutput) {
    var snapshotArray = [];
    template.content.childNodes.forEach(function (el) {
      snapshotArray.push(el);
    });
    return snapshotArray;
  }

  return snapshot;
};

exports.takeMountedSnapshot = takeMountedSnapshot;