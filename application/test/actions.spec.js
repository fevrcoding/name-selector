import expect from 'expect';

import {ACTION_NAMES_CHANGE, ACTION_SELECTED_ADD} from '../assets/javascripts/constants';
import {namesChangeAction, selectedAddAction} from '../assets/javascripts/actions';

describe('Test Actions', () => {


    describe('Action name action', () => {

        const names = ['John'];
        let action;

        beforeEach(() => {
            action = namesChangeAction(names);
        });

        it('should return an object', () => {
            expect(action).toBeA(Object);
        });

        it('should match the change action action type', () => {
            expect(action.type).toBe(ACTION_NAMES_CHANGE);
        });

        it('should pass new names', () => {
            expect(action.names).toEqual(names);
        });

        it('should return an empty array by default', () => {
            let defaultAction = namesChangeAction();
            expect(defaultAction.names).toBeA(Array);
            expect(defaultAction.names.length).toBe(0);
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