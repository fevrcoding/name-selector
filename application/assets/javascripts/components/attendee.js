/**
 * Attendee diplayer
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module components/attendee
 */

import React from 'react';
import {noop} from '../utils';

export default ({
    details = {},
    onSelectAttendee = noop
}) => (
    <li className="c-attendee" id={'attendee-' + details.id}>
        <p className="c-attendee__name">{details.name}</p>
        <button onClick={() => onSelectAttendee(details.id)} className="c-attendee__select">{'select'}</button>
    </li>
);