/* Copyright (C) Beshu Limited t/a ReadonlyREST Security - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Beshu Limited <info@readonlyrest.com> in London, UK
 */

import '@testing-library/jest-dom'
import MutationObserver from '@sheerun/mutationobserver-shim'

window.MutationObserver = MutationObserver;
