/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiPage } from '@elastic/eui';
export const Page = ({ restrictWidth, children }) => {
    return React.createElement(EuiPage, { restrictWidth: restrictWidth }, children);
};
