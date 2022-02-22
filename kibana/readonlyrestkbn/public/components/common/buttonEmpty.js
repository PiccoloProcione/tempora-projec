/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiButtonEmpty } from '@elastic/eui';
export const ButtonEmpty = ({ children, style, color = 'primary', textProps, contentProps, onClick }) => {
    return (React.createElement(EuiButtonEmpty, { contentProps: contentProps, onClick: onClick, textProps: textProps, color: color, style: style }, children));
};
