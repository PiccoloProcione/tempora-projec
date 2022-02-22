/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */
import React from 'react';
import { EuiNotificationBadge } from '@elastic/eui';
import { Popover } from './common/popover';
export const RorPopover = ({ id, closePopover, panelPaddingSize, badgeLabel, badgeTitle, anchorPosition, button, repositionOnScroll, isOpen, children, }) => {
    let optionalBadge;
    if (badgeLabel) {
        optionalBadge = (React.createElement(EuiNotificationBadge, { style: { position: 'absolute', top: '9%', right: '9%', zIndex: 9000 }, title: badgeTitle }, badgeLabel));
    }
    return (React.createElement(Popover, { closePopover: closePopover, anchorPosition: anchorPosition, isOpen: isOpen, id: id, panelPaddingSize: panelPaddingSize, repositionOnScroll: repositionOnScroll, hasArrow: true, button: React.createElement(React.Fragment, null,
            optionalBadge,
            button) }, children));
};
