import expect, { spyOn } from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {AttendeeList} from '../../assets/javascripts/components/attendee-list';

describe('Name Item Component Actions', () => {

    let shallowRenderer, output;

    const data = {
        attendees: [{
            id: 0,
            name: 'John'
        }, {
            id: 1,
            name: 'Jane'
        }]
    };

    beforeEach(() => {
        shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<AttendeeList {...data} />);
        output = shallowRenderer.getRenderOutput();
    });

    it('should render an unordered list', () => {
        expect(output.type).toBe('ul');
    });

    it('should render <Attendee> components', () => {
        output.props.children.forEach((prop, i) => {
            expect(prop.props.details).toEqual(data.attendees[i]);
        });
    });

});