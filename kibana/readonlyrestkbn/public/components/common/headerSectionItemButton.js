/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiHeaderSectionItemButton } from '@elastic/eui';
export const HeaderSectionItemButton = ({ onClick, children, textProps }) => {
    return (React.createElement(EuiHeaderSectionItemButton, { textProps: textProps, onClick: onClick }, children));
};
