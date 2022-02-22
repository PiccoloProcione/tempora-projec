/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiFlexGroup } from '@elastic/eui';
export const FlexGroup = ({ children, gutterSize = 'l', direction = 'row' }) => {
    return (React.createElement(EuiFlexGroup, { gutterSize: gutterSize, direction: direction }, children));
};
