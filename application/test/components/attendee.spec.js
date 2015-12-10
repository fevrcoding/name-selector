import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Attendee from '../../assets/javascripts/components/attendee';

describe('Name Item Component Actions', () => {

    let shallowRenderer, output;

    const data = {
        id: 0,
        name: 'John'
    };

    beforeEach(() => {
        shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<Attendee details={data} />);
        output = shallowRenderer.getRenderOutput();
    });

    it('should render a list item', () => {
        expect(output.type).toBe('li');
    });

    it('should have the name as its unique child', () => {
        expect(output.props.children).toBe(data.name);
    });

});