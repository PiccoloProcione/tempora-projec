/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiPopoverTitle } from '@elastic/eui';
const PopoverTitle = ({ children }) => {
    return React.createElement(EuiPopoverTitle, null, children);
};
export default PopoverTitle;
