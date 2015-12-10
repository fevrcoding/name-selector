/**
 * Actions
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module actions
 */

import {ACTION_ATTENDEES_CHANGE, ACTION_SELECTED_ADD} from './constants';

export function attendeeListChangeAction(attendeeList = []) {
    return {
        type: ACTION_ATTENDEES_CHANGE,
        attendeeList
    };
}

export function selectedAddAction(selected = '') {
    return {
        type: ACTION_SELECTED_ADD,
        selected
    };
}
