/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { Popover } from './popover';
import { FlexGroup } from './flexGroup';
import LinkButton from './linkButton';
import { Text } from './text';
const Menu = ({ button, isOpen, handleClose, closeMainMenu, items, selectedItem }) => {
    return (React.createElement(Popover, { button: button, closePopover: handleClose, style: { display: 'grid' }, id: 'rorKibanaManagementPopover', isOpen: isOpen, anchorPosition: 'leftDown', panelPaddingSize: "s", hasArrow: false },
        React.createElement(FlexGroup, { direction: 'column', gutterSize: 's' }, items.map((menuItem, index) => (React.createElement(LinkButton, { isSelected: selectedItem === menuItem.title, key: index, onClick: (event) => {
                menuItem.action(event);
                if (closeMainMenu) {
                    handleClose();
                    closeMainMenu();
                }
            } },
            React.createElement(Text, null, menuItem.title)))))));
};
export default Menu;
