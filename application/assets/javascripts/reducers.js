/**
 * Reducers
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module reducers
 */

import { combineReducers } from 'redux';
import {ACTION_ATTENDEES_CHANGE, ACTION_SELECTED_ADD} from './constants';

export function attendeeListReducer(state = [], action = {}) {

    switch (action.type) {
    case ACTION_ATTENDEES_CHANGE:
        return [...action.attendeeList];
    default:
        return state;
    }

}

export function selectedReducer(state = [], action = {}) {

    switch (action.type) {
    case ACTION_SELECTED_ADD:
        return [...state, action.selected];
    default:
        return state;
    }
}


export default combineReducers({
    attendeeList: attendeeListReducer,
    selected: selectedReducer
});

