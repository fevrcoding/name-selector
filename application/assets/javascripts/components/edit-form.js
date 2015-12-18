/**
 * Attendee edit form
 *
 * @author Marco Solazzi
 * @copyright (c) AQuest
 * @module components/edit-form
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {attendeeListChangeAction} from '../actions';


function mapStateToProps(state) {
    return {
        attendees: state.attendeeList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAttendees: bindActionCreators(attendeeListChangeAction, dispatch)
    };
}

export class EditForm extends Component {

    static parseAttendees(value = '') {
        return value.split("\n")
            .map((line) => line.replace(/[\s]+/g, ' ').trim())
            .filter((line) => !!line.length)
            .map((name, id) => {
                return {id, name};
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const value = (this.refs.attendeeInput.value || '').trim();
        const attendees = EditForm.parseAttendees(value);
        this.props.updateAttendees(attendees);

    }

    attendeesToString() {
        return this.props.attendees.map((attendee) => attendee.name).join("\n").trim();
    }

    render() {

        let attendees = this.attendeesToString();

        return (
            <form action="" onSubmit={this.handleSubmit.bind(this)}>
                <textarea cols="30" ref="attendeeInput" id="edit-form" name="edit-form" rows="10" defaultValue={attendees} />
                <p>
                    <button type="submit" ref="submitBtn">{'Save'}</button>
                    <button type="reset">{'Reset'}</button>
                </p>
            </form>
        );
    }
}

EditForm.propTypes = {
    attendees: React.PropTypes.array,
    updateAttendees: React.PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditForm);