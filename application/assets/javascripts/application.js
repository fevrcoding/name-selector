/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

//redux stuff
import reducers from './reducers';

//middlewares
import multi from './multi.middleware';

//container Components
import AttendeeListContainer from './components/attendee-list';
import SelectedListContainer from './components/selected-list';
import EditForm from './components/edit-form';

const middlewares = [multi];
if (PRODUCTION === false) {
    middlewares.push(createLogger({
        collapsed: true
    }));
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <section>
                <EditForm />
                <AttendeeListContainer />
                <SelectedListContainer />
            </section>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);