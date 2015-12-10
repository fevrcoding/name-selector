/**
 * Attendee diplayer
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module components/attendee
 */

import React from 'react';

export default ({
    details
}) => (
    <li className="c-attendee" id={'attendee-' + details.id}>{details.name}</li>
);
