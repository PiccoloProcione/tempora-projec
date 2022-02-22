/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import Fieldset from '../common/fieldset';
const Group = ({ label, children }) => {
    const theme = sessionStorage.getItem('rorTheme');
    const borderColor = theme === 'dark' ? '#4d4c4c' : '#d3dae6';
    return (React.createElement(Fieldset, { legend: {
            children: label,
        }, style: {
            border: `1px solid ${borderColor}`,
            margin: '2px 0',
            padding: '5.6px 12px 10px',
        } }, children));
};
export default Group;
