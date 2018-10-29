import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { PrivateRoute } from '../../_components';
import { Header } from '../../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true
        }

        const { dispatch } = this.props;
    }

    handleClickLogout(e) {
        e.preventDefault()
    }

    render() {
        const { loggedIn } = this.props;
        return (
            <div className="container">
                <Header logout={this.handleClickLogout}/>
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <a href="#">
                                    Escenarios
                                </a>
                                <span className="badge">12</span>
                            </li>
                            <li className="list-group-item">
                                <a href="#">
                                    Administración
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-9">

                    </div>
                </div>
                <Router history={history}>
                    <div>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return {
        loggedIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 