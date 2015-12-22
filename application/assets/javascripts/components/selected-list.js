/**
 * Selected attendees component
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module selected-list
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    const selected = [];
    state.attendeeList.forEach((attendee) => {
        let idx = state.selected.indexOf(attendee.id);
        if (idx !== -1) {
            selected[idx] = attendee;
        }
    });
    return {selected};
}


export class SelectedList extends Component {


    render() {

        const attendees = this.props.selected.map((attendee) => {
            return <li className="selected-list__item" key={attendee.id}>{attendee.name}</li>;
        });

        return <ol className="selected-list">{attendees}</ol>;
    }

}

SelectedList.propTypes = {
    selected: React.PropTypes.array
};


export default connect(
    mapStateToProps
)(SelectedList);