import expect from 'expect';

import {ACTION_NAMES_CHANGE, ACTION_SELECTED_ADD} from '../assets/javascripts/constants';
import {namesReducer, selectedReducer} from '../assets/javascripts/reducers';

describe('Test Reducers', () => {


    describe('Name reducer', () => {

        it('should return an empty array by default', () => {

            const state = namesReducer();

            expect(state).toBeA(Array);
            expect(state.length).toBe(0);

        });

        it('should completely reset the names in the state', () => {

            const prevState = ['Jane'];

            const state = namesReducer(prevState, {type: ACTION_NAMES_CHANGE, names: ['John']});

            expect(state.length).toBe(1);
            expect(state[0]).toBe('John');

        });

    });


    describe('Selected reducer', () => {

        it('should return an empty array by default', () => {

            const state = selectedReducer();

            expect(state).toBeA(Array);
            expect(state.length).toBe(0);

        });

        it('should append a name to the reducer state', () => {
            const prevState = ['John'];



            const state = selectedReducer(prevState, {type: ACTION_SELECTED_ADD, selected: 'Jane'});
            expect(state.length).toBe(2);
            expect(state[1]).toBe('Jane');

        });

    });


});