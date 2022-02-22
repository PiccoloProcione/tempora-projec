/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { Text } from '../common/text';
const Paragraph = ({ label, value }) => {
    return (React.createElement(Text, { size: "s" },
        React.createElement("div", { style: { paddingBottom: '8px' } },
            label,
            " ",
            React.createElement("span", { style: { fontWeight: 600 } }, value))));
};
export default Paragraph;
