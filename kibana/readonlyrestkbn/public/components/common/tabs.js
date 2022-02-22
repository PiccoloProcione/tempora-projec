/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiTabs } from '@elastic/eui';
export const Tabs = ({ children, display = 'default', expand = false, size = 'm' }) => {
    return (React.createElement(EuiTabs, { display: display, expand: expand, size: size }, children));
};
