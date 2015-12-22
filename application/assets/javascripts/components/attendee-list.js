/**
 * Applicatino Container: List of attendees
 *
 * @author Marco Solazzi
 * @copyright (c) Marco solazzi
 * @module components/attendees-list
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {attendeeListSelectAction} from '../actions';
import Attendee from './attendee';

import 'gsap';

function mapStateToProps(state) {
    return {
        attendees: state.attendeeList.filter((attendee) => state.selected.indexOf(attendee.id) === -1)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectAttendee: (id) => {
            dispatch(attendeeListSelectAction(id));
        }
    };
}

export class AttendeeList extends Component {

    spin() {
        const body = this.refs.rouletteBody;

        const height = body.offsetHeight;

        var tl = new TimelineMax({repeat:2, stop: true});
        tl.add( TweenMax.to(body, 1, {y: height * -1, ease: Power0.easeNone}) );
        tl.add( TweenLite.set(body, {y: 0}) );

        tl.play();
    }

    selectAttendee(id) {
        this.props.onSelectAttendee(id);
    }

    render() {
        let items = this.props.attendees.map((attendee) => (
            <Attendee details={attendee} key={attendee.id} onSelectAttendee={this.selectAttendee.bind(this)} />
        ));
        return (<section className="c-roulette">
                    <div className="c-roulette__mask">
                        <ul className="c-roulette__body c-attendee-list" ref="rouletteBody">{items}</ul>
                    </div>
                    <footer>
                        <button className="o-btn" onClick={this.spin.bind(this)}>{'Spin!'}</button>
                    </footer>


                </section>);
    }
}

AttendeeList.propTypes = {
    attendees: React.PropTypes.array,
    onSelectAttendee: React.PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttendeeList);