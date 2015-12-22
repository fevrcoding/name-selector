import expect, {createSpy} from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Attendee from '../../assets/javascripts/components/attendee';

describe('Name Item Component Actions', () => {

    let shallowRenderer, output, clickSpy;

    const data = {
        id: 0,
        name: 'John'
    };

    beforeEach(() => {
        clickSpy = createSpy();
        shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<Attendee details={data} onSelectAttendee={clickSpy} />);
        output = shallowRenderer.getRenderOutput();
    });

    it('should render a list item', () => {
        expect(output.type).toBe('li');
    });

    it('should contain a label with the name as text', () => {
        const p = output.props.children.find((child) => child.type === 'p');
        expect(p.props.children).toBe('John');
    });

    it('should use passed-in callback for btn click action with details.id as argument', () => {
        const btn = output.props.children.find((child) => child.type === 'button');
        btn.props.onClick();
        expect(clickSpy).toHaveBeenCalledWith(data.id);
    });

});