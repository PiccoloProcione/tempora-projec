/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
export class Identity {
    constructor(username, kibanaHiddenApps, kibanaAccess, currentGroup, availableGroups) {
        this.username = username;
        this.kibanaHiddenApps = kibanaHiddenApps;
        this.kibanaAccess = kibanaAccess;
        this.currentGroup = currentGroup;
        this.availableGroups = availableGroups;
    }
}
