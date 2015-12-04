/**
 * Actions
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module actions
 */

import {ACTION_NAMES_CHANGE, ACTION_SELECTED_ADD} from './constants';

export function namesChangeAction(names = []) {
    return {
        type: ACTION_NAMES_CHANGE,
        names
    };
}

export function selectedAddAction(selected = '') {
    return {
        type: ACTION_SELECTED_ADD,
        selected
    };
}
