/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import hiddenAppsChecker from '../../../proxy/preKibanaProxy/kibana_apps/hiddenAppsChecker';
import Group from './group';
import { Button } from '../common/button';
import { Spacer } from '../common/spacer';
import KibanaManagement from '../kibana-management';
const ActionsGroups = ({ identity, closeRorMenu, isAccessUnrestricted, handleSettingsPageClick, }) => {
    const showKibanaManagementButton = () => {
        var _a, _b;
        if ((_a = identity.kibanaHiddenApps) === null || _a === void 0 ? void 0 : _a.includes('ROR Manage Kibana')) {
            return false;
        }
        return (_b = identity.kibanaHiddenApps) === null || _b === void 0 ? void 0 : _b.some((hiddenApp) => hiddenAppsChecker(hiddenApp, 'Management|Stack Management'));
    };
    const showSettingsButton = () => {
        var _a, _b;
        if (((_a = identity.kibanaHiddenApps) === null || _a === void 0 ? void 0 : _a.includes('readonlyrest_kbn')) || ((_b = identity.kibanaHiddenApps) === null || _b === void 0 ? void 0 : _b.includes('ROR Security Settings'))) {
            return false;
        }
        return identity.kibanaAccess === undefined || isAccessUnrestricted;
    };
    const showActionsGroup = showSettingsButton() || showKibanaManagementButton();
    return (React.createElement(React.Fragment, null, showActionsGroup && (React.createElement(React.Fragment, null,
        React.createElement(Group, { label: 'Actions' },
            showSettingsButton() && (React.createElement(React.Fragment, null,
                React.createElement(Button, { onClick: handleSettingsPageClick, fullWidth: true }, "Edit security settings"),
                showKibanaManagementButton() && React.createElement(Spacer, { size: 'm' }))),
            showKibanaManagementButton() && (React.createElement(KibanaManagement, { closeMainMenu: closeRorMenu }))),
        React.createElement(Spacer, null)))));
};
export default ActionsGroups;
