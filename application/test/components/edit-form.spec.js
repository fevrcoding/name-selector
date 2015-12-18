import expect, { createSpy, spyOn } from 'expect'
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {EditForm} from '../../assets/javascripts/components/edit-form';

describe('Edit Form Component Actions', () => {

    let editFormInstance, textarea;
    const props = {
        attendees: [{
            id: 0,
            name: 'John'
        }, {
            id: 1,
            name: 'Jane'
        }],
        updateAttendees: createSpy()
    };

    beforeEach(() => {
        editFormInstance = TestUtils.renderIntoDocument(<EditForm {...props} />);
        textarea = TestUtils.scryRenderedDOMComponentsWithTag(editFormInstance, 'textarea');
    });


    describe('EditForm.parseAttendees()', () => {

        it('should clean up empty lines and exceeeding whitespaces and return an array of names', () => {
            const expected = [{
                id: 0,
                name: 'John'
            }, {
                id: 1,
                name: 'Jane Doe'
            }];
            const input = "John\n    \nJane Doe\n\n";
            expect(EditForm.parseAttendees(input)).toEqual(expected);
        });
    });

    describe('.attendeesToString()', () => {

        it('should return a multi-line string of names', () => {
            const expected = "John\nJane";
            expect(editFormInstance.attendeesToString()).toBe(expected);
        });

    });

    describe('.handleSubmit()', () => {

        let submitEvent;

        beforeEach(() => {

            submitEvent = {
                preventDefault: createSpy()
            };

        });

        it('should prevent default submit event', () => {
            editFormInstance.handleSubmit(submitEvent);
            expect(submitEvent.preventDefault).toHaveBeenCalled();
        });

        it('should parse textarea input and call passed in update callback', () => {
            let testStr = "John Doe\nJane Doe";
            const expected = EditForm.parseAttendees(testStr);

            editFormInstance.refs.attendeeInput.value = testStr;
            editFormInstance.handleSubmit(submitEvent);

            expect(props.updateAttendees).toHaveBeenCalledWith(expected);
        });

    });

    describe('.render()',() => {

        it('should call handleSubmit when submit btn is clicked', () => {

            const btn = editFormInstance.refs.submitBtn;

            spyOn(editFormInstance, 'handleSubmit');

            TestUtils.Simulate.click(btn);

            expect(props.updateAttendees).toHaveBeenCalledWith(expected);


        });

    });

    //it('should render a list of names into the textarea', () => {
    //    const expected = props.
    //});


});