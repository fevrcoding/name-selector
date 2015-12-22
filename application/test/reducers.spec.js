import expect from 'expect';

import {ACTION_ATTENDEES_CHANGE, ACTION_ATTENDEES_SELECT, ACTION_ATTENDEES_DESELECT} from '../assets/javascripts/constants';
import {attendeeListReducer, attendeeSelectReducer, attendeeIdx} from '../assets/javascripts/reducers';

describe('Test Reducers', () => {


    describe('Attendee List reducer', () => {

        it('should return an empty array by default', () => {

            const state = attendeeListReducer();

            expect(state).toBeA(Array);
            expect(state.length).toBe(0);

        });

        it('should completely reset the names in the state', () => {

            const prevState = [{id: 0, name: 'Jane'}];

            const state = attendeeListReducer(prevState, {type: ACTION_ATTENDEES_CHANGE, attendeeList: ['John']});

            expect(state.length).toBe(1);
            expect(state[0].name).toBe('John');
            expect(state[0].id).toBe(attendeeIdx);
            expect(state[0].selected).toBe(false);

        });

    });

    describe('selected attendees reducer', () => {

        it('should add an id to the array', () => {
            const prevState = [];
            const state = attendeeSelectReducer(prevState, {type: ACTION_ATTENDEES_SELECT, id: 10});
            expect(state.length).toBe(1);
            expect(state[0]).toBe(10);
        });

        it('should return previous state if an invalid id is passed-in', () => {
            const prevState = [];
            const state = attendeeSelectReducer(prevState, {type: ACTION_ATTENDEES_SELECT, id: null});

            expect(state).toEqual(prevState);
        });


        it('should remove an id to the array', () => {
            const prevState = [10, 12];
            const state = attendeeSelectReducer(prevState, {type: ACTION_ATTENDEES_DESELECT, id: 10});
            expect(state.length).toBe(1);
            expect(state[0]).toBe(12);
        });

        it('should return previous state sif an invalid id is passed-in', () => {
            const prevState = [10, 12];

            const newState = attendeeSelectReducer(prevState, {type: ACTION_ATTENDEES_DESELECT, id: null});
            expect(newState).toEqual(prevState);

            const newState2 = attendeeSelectReducer(prevState, {type: ACTION_ATTENDEES_DESELECT, id: 11});
            expect(newState2).toEqual(prevState);

        });

    });


});