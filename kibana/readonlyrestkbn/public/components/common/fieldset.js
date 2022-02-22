/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiFormFieldset } from '@elastic/eui';
const Fieldset = ({ legend, children, style }) => {
    return (React.createElement(EuiFormFieldset, { legend: legend, style: style }, children));
};
export default Fieldset;
