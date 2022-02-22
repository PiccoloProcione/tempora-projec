/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
export const IconAppManagement = (_a) => {
    var { title = "", titleId = "" } = _a, props = __rest(_a, ["title", "titleId"]);
    return (React.createElement("svg", Object.assign({ width: 32, height: 32, viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg", "aria-labelledby": titleId }, props),
        title ? React.createElement("title", { id: titleId }, title) : null,
        React.createElement("path", { className: "euiIcon__fillSecondary", d: "M16 21a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" }),
        React.createElement("path", { d: "M20 32h-8v-4.06a1 1 0 00-1.61-.67l-2.88 2.87-5.65-5.65 2.87-2.87a.92.92 0 00.2-1 .93.93 0 00-.86-.6H0V12h4.06a.92.92 0 00.85-.58.94.94 0 00-.19-1L1.86 7.51l5.65-5.65 2.87 2.87A1 1 0 0012 4.06V0h8v4.06a1 1 0 001.61.67l2.87-2.87 5.66 5.66-2.87 2.87a.92.92 0 00-.2 1 .93.93 0 00.86.6H32v8h-4.06a.92.92 0 00-.85.58.94.94 0 00.19 1l2.87 2.87-5.66 5.66-2.87-2.87a1 1 0 00-1.61.67L20 32zm-6-2h4v-2.06a3 3 0 015-2.08l1.46 1.46 2.83-2.83L25.86 23a3 3 0 012.08-5H30v-4h-2.06a3 3 0 01-2.08-5l1.46-1.46-2.83-2.85L23 6.14a3 3 0 01-5-2.08V2h-4v2.06a3 3 0 01-5 2.08L7.51 4.69 4.69 7.51 6.14 9a3 3 0 01-2.08 5H2v4h2.06a3 3 0 012.08 5l-1.45 1.49 2.83 2.83L9 25.86a3 3 0 015 2.08V30z" })));
};
