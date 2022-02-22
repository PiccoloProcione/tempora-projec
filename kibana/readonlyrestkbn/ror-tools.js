#!./node/bin/node
/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

require = require("esm")(module/*, options*/)
let activate;
try {
    activate = require("./kibana/patchers/kibanaPatcher.js")
} catch (e) {
    activate = require("./kibana/patchers/kibanaPatcher.ts")
}
module.export = activate
activate.main()
