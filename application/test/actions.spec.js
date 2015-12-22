import expect from 'expect';

import {ACTION_ATTENDEES_CHANGE, ACTION_ATTENDEES_DESELECT, ACTION_ATTENDEES_SELECT} from '../assets/javascripts/constants';
import {attendeeListChangeAction, attendeeListDeselectAction, attendeeListSelectAction} from '../assets/javascripts/actions';

describe('Test Actions', () => {


    describe('AttendeeList change action', () => {

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

    describe('AttendeeList select action', () => {

        const selectId = 10;
        let action;

        beforeEach(() => {
            action = attendeeListSelectAction(selectId);
        });

        it('should return an integer', () => {
            expect(action).toBeA(Object);
        });

        it('should match the change action action type', () => {
            expect(action.type).toBe(ACTION_ATTENDEES_SELECT);
        });

        it('should pass new names', () => {
            expect(action.id).toBe(selectId);
        });


        it('should return zero by default', () => {
            let defaultAction = attendeeListSelectAction();
            expect(defaultAction.id).toBe(undefined);
        });

    });


    describe('AttendeeList de-select action', () => {

        const selectId = 10;
        let action;

        beforeEach(() => {
            action = attendeeListDeselectAction(selectId);
        });

        it('should return an integer', () => {
            expect(action).toBeA(Object);
        });

        it('should match the change action action type', () => {
            expect(action.type).toBe(ACTION_ATTENDEES_DESELECT);
        });

        it('should pass new names', () => {
            expect(action.id).toBe(selectId);
        });


        it('should return zero by default', () => {
            let defaultAction = attendeeListDeselectAction();
            expect(defaultAction.id).toBe(undefined);
        });

    });

});