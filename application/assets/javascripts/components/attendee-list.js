/**
 * Applicatino Container: List of attendees
 *
 * @author Marco Solazzi
 * @copyright (c) Marco solazzi
 * @module components/attendees-list
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Attendee from './attendee';

function mapStateToProps(state) {
    return {
        attendees: state.attendeeList
    };
}

export class AttendeeList extends Component {

    render() {
        let items = this.props.attendees.map((attendee) => (
            <Attendee details={attendee} key={attendee.id} />
        ));
        return <ul>{items}</ul>;
    }
}

AttendeeList.propTypes = {
    attendees: React.PropTypes.array
};

export default connect(
    mapStateToProps
)(AttendeeList);