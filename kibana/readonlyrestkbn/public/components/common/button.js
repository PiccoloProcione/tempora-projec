/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiButton } from '@elastic/eui';
export const Button = ({ children, style, color = 'primary', textProps, contentProps, onClick, fullWidth, }) => {
    return (React.createElement(EuiButton, { contentProps: contentProps, fullWidth: fullWidth, onClick: onClick, textProps: textProps, color: color, style: style }, children));
};
