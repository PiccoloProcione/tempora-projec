/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { Button } from './button';
import { ArrowLeftIcon } from '../icons/arrowLeftIcon';
const MenuButton = ({ handleClick, text }) => {
    return (React.createElement(Button, { onClick: handleClick, fullWidth: true, textProps: { style: { display: 'flex', justifyContent: 'space-between' } } },
        React.createElement(ArrowLeftIcon, { fill: '#006BB4' }),
        React.createElement("div", { style: { flex: 1, marginRight: '24px' } }, text)));
};
export default MenuButton;
