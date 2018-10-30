import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../../_components';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { Header } from '../../_components';

import { Login } from '../Login';
import { Home } from '../Home';

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
                {loggedIn &&
                    <Header logout={this.handleClickLogout}/>
                }
                <div className="row">
                    {loggedIn &&
                        <div className="col-sm-3">
                            <ul className="list-group">
                                    <li className="list-group-item">
                                        <a href="/scenarios">
                                            Escenarios
                                        </a>
                                        <span className="badge">12</span>
                                    </li>
                                <li className="list-group-item">
                                    <a href="/administration">
                                        Administración
                                    </a>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className={loggedIn ? 'col-sm-9' : 'col-sm-12'}>
                        <Router history={history}>
                            <div>
                                <Route path="/login" component={Login} />
                                <PrivateRoute exact path="/" component={Home} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 