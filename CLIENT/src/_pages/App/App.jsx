import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../../_components';
import { connect } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { Header } from '../../_components';
import { LeftNavbar } from '../../_components';

import { Login } from '../Login';
import { Home } from '../Home';
import { Administration } from '../Administration';

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
                        <LeftNavbar />
                    }
                    <div className={loggedIn ? 'col-sm-9' : 'col-sm-12'}>
                        <Router history={history}>
                            <div>
                                <Route path="/login" component={Login} />
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute exact path="/administration" component={Administration} />
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