/**
 * Actions
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module actions
 */

import {ACTION_ATTENDEES_CHANGE, ACTION_ATTENDEES_SELECT, ACTION_ATTENDEES_DESELECT} from './constants';

export function attendeeListChangeAction(attendeeList = []) {
    return {
        type: ACTION_ATTENDEES_CHANGE,
        attendeeList
    };
}

export function attendeeListSelectAction(id) {
    return {
        type: ACTION_ATTENDEES_SELECT,
        id
    };
}

export function attendeeListDeselectAction(id) {
    return {
        type: ACTION_ATTENDEES_DESELECT,
        id
    };
}