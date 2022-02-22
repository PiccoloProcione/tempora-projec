/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React, { useState } from 'react';
import Menu from '../common/menu';
import coreFunctions from '../../utils/coreFunctions';
import MenuButton from '../common/menuButton';
const menuItems = [
    {
        title: 'Reporting',
        action: () => {
            coreFunctions.redirect(coreFunctions.basePathPrepend('/app/management/insightsAndAlerting/reporting'));
        },
    },
    {
        title: 'Index Patterns',
        action: () => {
            coreFunctions.redirect(coreFunctions.basePathPrepend('/app/management/kibana/indexPatterns'));
        },
    },
    {
        title: 'Saved Objects',
        action: () => {
            coreFunctions.redirect(coreFunctions.basePathPrepend('/app/management/kibana/objects'));
        },
    },
];
const KibanaManagement = ({ closeMainMenu }) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened((prevState) => !prevState);
    const handleMenuClose = () => setMenuOpened(false);
    return (React.createElement(Menu, { button: React.createElement(MenuButton, { text: 'Manage kibana', handleClick: toggleMenu }), isOpen: menuOpened, closeMainMenu: closeMainMenu, items: menuItems, handleClose: handleMenuClose }));
};
export default KibanaManagement;
