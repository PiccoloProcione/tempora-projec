/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import * as React from "react";
import { HeaderSectionItemButton } from "./common/headerSectionItemButton";
import { Spacer } from "./common/spacer";
import { Button } from "./common/button";
import { FlexGroup } from "./common/flexGroup";
import { FlexItem } from "./common/flexItem";
import { Identity } from "./identity";
import TenancySelect from "./tenancy-select";
import Group from "./ror-menu/group";
import Paragraph from "./ror-menu/paragraph";
import { RorPopover } from "./rorPopover";
import PopoverTitle from "./common/popoverTitle";
import coreFunctions from "../utils/coreFunctions";
import ActionsGroups from "./ror-menu/actionsGroups";
export class RorMenu extends React.Component {
    constructor(props) {
        super(props);
        this.isAccessUnrestricted = (identity) => {
            const kibanaAccess = identity.kibanaAccess;
            return kibanaAccess === 'unrestricted' || kibanaAccess === 'admin';
        };
        this.toggleRorMenu = () => {
            this.setState({
                showRorMenu: !this.state.showRorMenu,
            });
        };
        this.closeRorMenu = () => {
            this.setState({
                showRorMenu: false,
            });
        };
        this.onLogoutClick = () => {
            window.location.href = this.props.logoutRedirect;
        };
        this.onGoToSettingsPageClick = () => {
            let iframe = document.createElement("iframe");
            iframe.src = this.props.pkpBasePath + `/web?basePath=${coreFunctions.serverBasePath}/`;
            iframe.frameBorder = "0";
            iframe.id = "readonlyrestIframe";
            iframe.style.position = "relative";
            iframe.style.zIndex = "999";
            iframe.style.height = "100%";
            iframe.style.width = "100%";
            iframe.style.top = "0";
            iframe.style.backgroundColor = "white";
            iframe.style.border = "none";
            this.setState({
                settingsWindow: {
                    iframe: iframe,
                    previousOverflow: document.body.style.overflow
                }
            });
            document.body.prepend(iframe);
            document.body.style.overflow = "hidden";
            this.setState({
                showRorMenu: false,
            });
        };
        this.onMessageFromIframe = (event) => {
            if (event.origin !== window.location.origin)
                return;
            const data = event.data;
            if (data && data.settingsIframe && data.settingsIframe == "CLOSE") {
                this.onHideSettings();
                return;
            }
            if (data && data.settingsIframe && data.settingsIframe == "REMOVE") {
                document.body.removeChild(this.state.settingsWindow.iframe);
                document.body.style.overflow = this.state.settingsWindow.previousOverflow;
                this.setState({ settingsWindow: undefined });
            }
        };
        this.onHideSettings = () => {
            if (this.state.settingsWindow) {
                const iframeElement = document.getElementById('readonlyrestIframe');
                iframeElement.contentWindow.postMessage({ settingsIframe: "CLOSE_EVENT_DISPATCHED" }, '*');
            }
        };
        this.getBadgeLabel = () => {
            switch (this.state.identity.kibanaAccess) {
                case 'ro':
                    return 'ro';
                case 'ro_strict':
                    return 'rs';
                case 'rw':
                    return 'rw';
                case 'admin':
                    return 'a';
                case 'unrestricted':
                    return 'u';
                default:
                    return '';
            }
        };
        this.renderAccessLevel = () => {
            return this.isAccessUnrestricted(this.state.identity) ? this.state.identity.kibanaAccess : this.state.identity.kibanaAccess && this.state.identity.kibanaAccess.toUpperCase();
        };
        this.onTenancyHop = (value) => {
            var _a, _b;
            const { clearSessionOnEvents } = this.props;
            if (clearSessionOnEvents === null || clearSessionOnEvents === void 0 ? void 0 : clearSessionOnEvents.includes('tenancyHop')) {
                (_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.clear();
                window.localStorage.setItem(`insecureClusterWarningVisibility${coreFunctions.serverBasePath}`, '{ "show": false}');
                (_b = window.sessionStorage) === null || _b === void 0 ? void 0 : _b.clear();
            }
            location.href = coreFunctions.serverBasePathPrepend('/switch-group?group=' + value + '&redirectTo=' + encodeURIComponent(location.href));
        };
        this.state = {
            showRorMenu: false,
            identity: new Identity("", [])
        };
    }
    componentDidMount() {
        console.log("Fetching identity....");
        fetch(this.props.pkpBasePath + '/api/identity')
            .then(response => response.json())
            .then(json => {
            console.log(">> Setting rorMenu state : " + JSON.stringify(json, null, 2));
            return json;
        })
            .then((identity) => this.setState({ identity: identity }))
            .catch((e) => console.log("Error fetching identity ", e));
        document.getElementById("kibana-body").addEventListener('click', this.onHideSettings);
        window.addEventListener('popstate', this.onHideSettings);
        window.addEventListener("message", this.onMessageFromIframe, false);
        this.setTheme();
    }
    componentWillUnmount() {
        const kibanaBody = document.getElementById("kibana-body");
        if (kibanaBody) {
            kibanaBody.removeEventListener('click', this.onHideSettings);
        }
        window.removeEventListener('popstate', this.onHideSettings);
        window.removeEventListener("message", this.onMessageFromIframe, false);
    }
    setTheme() {
        const isDarkMode = coreFunctions.getSettingsParameter('theme:darkMode');
        sessionStorage.setItem('rorTheme', isDarkMode ? 'dark' : 'light');
    }
    render() {
        var _a;
        const { identity, showRorMenu } = this.state;
        const button = (React.createElement(HeaderSectionItemButton, { onClick: this.toggleRorMenu, textProps: { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } } },
            React.createElement("div", { style: { display: "flex", alignItems: 'center', justifyContent: 'center' } },
                React.createElement("img", { alt: "ReadonlyREST", height: "20", src: this.props.pkpBasePath + "/legacy/web/assets/rorSVG.svg" }))));
        return (React.createElement(RorPopover, { id: 'rorMenuPopover', button: button, isOpen: showRorMenu, closePopover: this.closeRorMenu, anchorPosition: "downCenter", panelPaddingSize: "m", badgeLabel: this.getBadgeLabel(), badgeTitle: identity.kibanaAccess },
            React.createElement(PopoverTitle, null,
                React.createElement(FlexGroup, null,
                    React.createElement(FlexItem, null, "ReadonlyREST"),
                    React.createElement(FlexItem, { className: 'chrHeaderHelpMenu__version', style: {
                            fontWeight: 200,
                            fontSize: '65%',
                            whiteSpace: 'nowrap'
                        } }, this.props.rorVersion + " 🦄"))),
            React.createElement(ActionsGroups, { identity: identity, closeRorMenu: this.closeRorMenu, isAccessUnrestricted: this.isAccessUnrestricted(identity), handleSettingsPageClick: this.onGoToSettingsPageClick }),
            ((_a = identity.availableGroups) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                React.createElement(React.Fragment, null,
                    React.createElement(Group, { label: 'Tenancies' },
                        React.createElement(Paragraph, { label: 'Currently on:', value: identity.currentGroup }),
                        React.createElement(TenancySelect, { availableGroups: identity.availableGroups, handleChange: this.onTenancyHop, currentGroup: identity.currentGroup, closeMainMenu: this.closeRorMenu })),
                    React.createElement(Spacer, null)),
            React.createElement(Group, { label: 'Identity' },
                React.createElement(Paragraph, { label: 'Logged in as:', value: identity.username }),
                identity.kibanaAccess && React.createElement(Paragraph, { label: 'Access level:', value: this.renderAccessLevel() }),
                React.createElement(Button, { onClick: this.onLogoutClick, color: 'secondary', fullWidth: true }, "Log out"))));
    }
}
