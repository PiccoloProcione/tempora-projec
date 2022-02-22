/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiFlexItem } from '@elastic/eui';
export const FlexItem = ({ className, style, children, grow }) => {
    return (React.createElement(EuiFlexItem, { className: className, style: style, grow: grow }, children));
};
