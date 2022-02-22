/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import * as React from 'react';
import { Page } from "./common/page";
import { PageBody } from "./common/pageBody";
import { Title } from "./common/title";
import { Spacer } from "./common/spacer";
import { Tabs } from "./common/tabs";
import { Tab } from "./common/tab";
export const RorPage = ({ tabNumber, children }) => {
    const onTabChange = (tab) => {
        window.location.href = tab;
    };
    return (React.createElement(Page, { restrictWidth: 1200 },
        React.createElement(PageBody, null,
            React.createElement(Title, { size: "l" },
                React.createElement("h1", null, "ReadonlyREST")),
            React.createElement(Spacer, { size: "l" }),
            React.createElement(Tabs, { display: "default", expand: false, size: "m" },
                React.createElement(Tab, { onClick: () => onTabChange("#/settings"), isSelected: tabNumber === 1 }, "Configuration"),
                React.createElement(Tab, { onClick: () => onTabChange("#/audit"), isSelected: tabNumber === 2 }, "Audit")),
            React.createElement(Spacer, { size: "l" }),
            children)));
};
