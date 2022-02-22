/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { ButtonEmpty } from "./buttonEmpty";
const LinkButton = ({ children, onClick, isSelected }) => {
    return (React.createElement(ButtonEmpty, { color: 'text', contentProps: {
            style: {
                justifyContent: 'flex-end',
            },
        }, style: {
            cursor: isSelected ? 'default' : 'pointer',
            padding: '8px',
            border: 'none',
            boxShadow: 'none',
            transform: 'none',
            backgroundColor: isSelected ? 'rgba(211,218,230,.25)' : 'initial',
            pointerEvents: isSelected ? 'none' : 'initial',
        }, onClick: onClick }, children));
};
export default LinkButton;
