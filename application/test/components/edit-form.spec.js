import expect, { createSpy } from 'expect'
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {EditForm} from '../../assets/javascripts/components/edit-form';

describe('Edit Form Component Actions', () => {

    let editFormInstance, textarea, button;
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
        ///button = TestUtils.findRenderedDOMComponentWithTag(editFormInstance, 'button');
    });



    describe('Instance Methods', () => {

        it('should return a multi-line string of names', () => {
            const expected = "John\nJane";
            expect(editFormInstance.getAttendees()).toBe(expected);
        });

        //it('should clean up empty lines and exceeeding whitespaces', () => {
        //    const expected = "John\nJane Doe";
        //    let newProps = Object.assign({}, props);
        //    newProps.attendees = [
        //        {
        //            id: 0,
        //            name: 'John'
        //        },
        //        {
        //            id: 1,
        //            name: '   '
        //        },
        //        {
        //            id: 2,
        //            name: 'Jane Doe'
        //        }
        //    ];
        //    editFormInstance = TestUtils.renderIntoDocument(<EditForm {...newProps} />);
        //    expect(editFormInstance.getAttendees()).toBe(expected);
        //});
        it('should clean up empty lines and exceeeding whitespaces', () => {
            const expected = ['John', 'Jane Doe'];
            const input = "John\n    \nJane Doe\n\n";
            expect(EditForm.filterAttendees(input)).toEqual(expected);
        });
    });

    //it('should render a list of names into the textarea', () => {
    //    const expected = props.
    //});


});