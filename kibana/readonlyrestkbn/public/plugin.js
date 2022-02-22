/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { RorMenu } from "./components/rorMenu";
import coreFunctions from "./utils/coreFunctions";
export class ReadonlyrestKbnPlugin {
    constructor(initializerContext) {
        this.initializerContext = initializerContext;
        this.config = this.initializerContext.config.get();
    }
    setup(core) {
        return {};
    }
    start(core) {
        coreFunctions.initialization(core);
        core.chrome.navControls.registerRight({
            order: 10000,
            mount: (target) => this.mount(target, core),
        });
        return {};
    }
    stop() {
    }
    mount(target, core) {
        const readableVersionString = (version) => {
            return (version === null || version === void 0 ? void 0 : version.replace("-", " ").charAt(0).toUpperCase()) + version.slice(1);
        };
        let redirectToLogout = coreFunctions.serverBasePathPrepend("/logout");
        const origin = this.config.identity["x-ror-origin"];
        if (origin) {
            redirectToLogout += '?x-ror-origin=' + origin;
        }
        const ROR_VERSION = "enterprise-1.38.0-20220221_es7.16.2";
        ReactDOM.render(React.createElement(RorMenu, { pkpBasePath: coreFunctions.serverBasePathPrepend("/pkp"), rorVersion: readableVersionString(ROR_VERSION), logoutRedirect: redirectToLogout, clearSessionOnEvents: this.config.clearSessionOnEvents }), target);
        return () => ReactDOM.unmountComponentAtNode(target);
    }
}
