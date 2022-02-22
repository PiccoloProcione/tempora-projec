/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiFlexGrid } from '@elastic/eui';
export const FlexGrid = ({ gutterSize = 'l', columns = 0, children }) => {
    return (React.createElement(EuiFlexGrid, { gutterSize: gutterSize, columns: columns }, children));
};
