/**
 * Reducers
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module reducers
 */

import { combineReducers } from 'redux';
import {ACTION_NAMES_CHANGE, ACTION_SELECTED_ADD} from './constants';

export function namesReducer(state = [], action = {}) {

    switch (action.type) {
    case ACTION_NAMES_CHANGE:
        return [...action.names];
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
    names: namesReducer,
    selected: selectedReducer
});

