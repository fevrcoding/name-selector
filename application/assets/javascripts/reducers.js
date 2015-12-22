/**
 * Reducers
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module reducers
 */

import { combineReducers } from 'redux';
import {ACTION_ATTENDEES_CHANGE, ACTION_ATTENDEES_SELECT, ACTION_ATTENDEES_DESELECT} from './constants';
import {toTitleCase} from './utils';

export let attendeeIdx = 0;

export function attendeeListReducer(state = [], action = {}) {

    switch (action.type) {

    case ACTION_ATTENDEES_CHANGE:
        const {attendeeList = []} = action;
        return attendeeList.map((name) => {
            return {
                id: (++attendeeIdx),
                name: toTitleCase(name),
                selected: false
            };
        });

    default:
        return state;
    }
}


export function attendeeSelectReducer(state = [], action = {}) {

    switch (action.type) {

    case ACTION_ATTENDEES_SELECT:
        if (Number.isInteger(action.id)) {
            return [...state, action.id];
        }
        return state;

    case ACTION_ATTENDEES_DESELECT:
        if (Number.isInteger(action.id) && state.indexOf(action.id) !== -1) {
            return state.filter((id) => id !== action.id);
        }
        return state;

    default:
        return state;
    }

}


export default combineReducers({
    attendeeList: attendeeListReducer,
    selected: attendeeSelectReducer
});

