import expect from 'expect';

import {ACTION_ATTENDEES_CHANGE, ACTION_SELECTED_ADD} from '../assets/javascripts/constants';
import {attendeeListChangeAction, selectedAddAction} from '../assets/javascripts/actions';

describe('Test Actions', () => {


    describe('Action name action', () => {

        const attendeeList = ['John'];
        let action;

        beforeEach(() => {
            action = attendeeListChangeAction(attendeeList);
        });

        it('should return an object', () => {
            expect(action).toBeA(Object);
        });

        it('should match the change action action type', () => {
            expect(action.type).toBe(ACTION_ATTENDEES_CHANGE);
        });

        it('should pass new names', () => {
            expect(action.attendeeList).toEqual(attendeeList);
        });

        it('should return an empty array by default', () => {
            let defaultAction = attendeeListChangeAction();
            expect(defaultAction.attendeeList).toBeA(Array);
            expect(defaultAction.attendeeList.length).toBe(0);
        });

    });


    describe('Selected names action', () => {

        const selected = 'Mary';
        let action;

        beforeEach(() => {
            action = selectedAddAction(selected);
        });

        it('should return an object', () => {
            expect(action).toBeA(Object);
        });

        it('should match the change action action type', () => {
            expect(action.type).toBe(ACTION_SELECTED_ADD);
        });

        it('should pass new names', () => {
            expect(action.selected).toEqual(selected);
        });

        it('should return an empty array by default', () => {
            let defaultAction = selectedAddAction();
            expect(defaultAction.selected).toBe('');
        });

    });

});