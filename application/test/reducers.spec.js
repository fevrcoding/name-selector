import expect from 'expect';

import {ACTION_ATTENDEES_CHANGE, ACTION_SELECTED_ADD} from '../assets/javascripts/constants';
import {attendeeListReducer, selectedReducer} from '../assets/javascripts/reducers';

describe('Test Reducers', () => {


    describe('Attendee List reducer', () => {

        it('should return an empty array by default', () => {

            const state = attendeeListReducer();

            expect(state).toBeA(Array);
            expect(state.length).toBe(0);

        });

        it('should completely reset the names in the state', () => {

            const prevState = ['Jane'];

            const state = attendeeListReducer(prevState, {type: ACTION_ATTENDEES_CHANGE, attendeeList: ['John']});

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