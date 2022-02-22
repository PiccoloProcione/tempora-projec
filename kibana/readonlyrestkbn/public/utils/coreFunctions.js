/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class CoreFunctions {
    checkInitialization() {
        if (!this.core) {
            throw new Error('You need to initialized your class first');
        }
    }
    initialization(core) {
        this.core = core;
    }
    redirect(pathname) {
        this.checkInitialization();
        this.core.application.navigateToUrl(pathname);
    }
    /**
     * Prepend basePath and Include kibana space url namespace
     * @param pathname
     */
    basePathPrepend(pathname) {
        this.checkInitialization();
        return this.core.http.basePath.prepend(pathname);
    }
    /**
     * Prepend basePath and Ignore kibana space url namespace
     * @param pathname
     */
    serverBasePathPrepend(pathname) {
        this.checkInitialization();
        return `${this.serverBasePath}${pathname}`;
    }
    getSettingsParameter(parameter) {
        this.checkInitialization();
        return this.core.uiSettings.get(parameter);
    }
    /**
     * kibana basePath without space url namespace
     */
    get serverBasePath() {
        this.checkInitialization();
        return this.core.http.basePath.serverBasePath;
    }
    /**
     * kibana basePath with space url namespaceł
     */
    get basePath() {
        this.checkInitialization();
        return this.core.http.basePath.get();
    }
}
export default new CoreFunctions();
