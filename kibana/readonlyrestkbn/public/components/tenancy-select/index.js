/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import * as React from 'react';
import Menu from '../common/menu';
import MenuButton from '../common/menuButton';
const TenancySelect = ({ currentGroup, availableGroups, handleChange, closeMainMenu }) => {
    const [menuOpened, setMenuOpened] = React.useState(false);
    const toggleMenu = () => setMenuOpened((prevState) => !prevState);
    const handleCloseMenu = () => setMenuOpened(false);
    const getItems = () => availableGroups.map((group) => ({
        title: group,
        action: () => {
            handleChange(group);
        },
    }));
    return (React.createElement(Menu, { button: React.createElement(MenuButton, { text: 'Change tenancy', handleClick: toggleMenu }), isOpen: menuOpened, items: getItems(), selectedItem: currentGroup, closeMainMenu: closeMainMenu, handleClose: handleCloseMenu }));
};
export default TenancySelect;
