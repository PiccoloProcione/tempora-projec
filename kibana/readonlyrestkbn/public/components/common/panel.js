/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import * as React from 'react';
import { EuiPanel } from '@elastic/eui';
import { forwardRef } from "react";
export const Panel = forwardRef(({ children, className, paddingSize = 'm', grow = true, style, }, ref) => {
    return (React.createElement(EuiPanel, { panelRef: ref, className: className, paddingSize: paddingSize, grow: grow, style: style }, children));
});
