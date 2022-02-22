/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiSpacer } from '@elastic/eui';
export const Spacer = ({ size = 'l' }) => {
    return React.createElement(EuiSpacer, { size: size });
};
