/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

module.exports = {
  presets: [[
    '@babel/preset-env',
    {
      "targets": {
        "chrome": "58",
        "ie": "11"
      }
    },
    '@babel/preset-react'
  ]],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    "@babel/plugin-transform-runtime",
    "add-module-exports",
    "@babel/plugin-transform-modules-commonjs"
  ]
}
