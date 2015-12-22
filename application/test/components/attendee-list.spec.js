import expect, { createSpy } from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {AttendeeList} from '../../assets/javascripts/components/attendee-list';
import Attendee from '../../assets/javascripts/components/attendee';

describe('Name Item Component Actions', () => {

    let attendeeListInstance;

    const data = {
        attendees: [{
            id: 0,
            name: 'John'
        }, {
            id: 1,
            name: 'Jane'
        }],
        onSelectAttendee: createSpy()
    };

    beforeEach(() => {
        attendeeListInstance = TestUtils.renderIntoDocument(<AttendeeList {...data} />);
    });

    describe('.selectAttendee()', () => {

        it('should call passed-in onSelectAttendee prop', () => {
            attendeeListInstance.selectAttendee(1);
            expect(data.onSelectAttendee).toHaveBeenCalledWith(1);
        });

    });

    describe('.render()', () => {
        it('should render an unordered list', () => {
            const ul = TestUtils.findRenderedDOMComponentWithTag(attendeeListInstance, 'ul');
            expect(ul.tagName).toBe('UL');
        });

        it('should render list items components', () => {

            const list = TestUtils.scryRenderedDOMComponentsWithTag(attendeeListInstance, 'li');
            expect(list.length).toBe(data.attendees.length);
        });
    });


});