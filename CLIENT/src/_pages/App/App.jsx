import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute, Header, LeftNavbar } from '../../_components';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { alertActions, userActions, loaderActions } from '../../_actions';
import { Login } from '../Login';
import { Home } from '../Home';
import { ScenariosList, ScenarioForm, ScenarioDescription } from '../Scenarios';
import { ProductsForm, ProductsList } from '../Products';
import '../../assets/css/app.css';
import Loader from '../../assets/images/loader.gif';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true
        }

        const { dispatch } = this.props;

        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(alertActions.clear());
    }

    componentWillUpdate() {
        this.props.dispatch(alertActions.clear());
    }

    handleClickLogout(e) {
        e.preventDefault()

        this.props.dispatch(userActions.logout())

    }

    render() {

        const { loggedIn, alert, loading } = this.props;

        return (
            <Router history={history}>
                <div className="row">
                    {loading &&
                        <div className="loader">
                            <div className="cont-loader">
                                <img src={Loader} className="loader-icon"/>
                            </div>
                        </div>
                    }
                    {loggedIn &&
                        <div className="col-sm-12"> 
                            <Header logout={this.handleClickLogout}/>
                        </div>
                    }
                    {loggedIn && <LeftNavbar />}
                    <div className={`app-container ${loggedIn ? 'col-sm-10' : 'col-sm-12'}`}>
                        {alert &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Route path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/scenarios" component={ScenariosList} />
                        <PrivateRoute exact path="/scenarios/update/:id" component={ScenarioForm} />
                        <PrivateRoute exact path="/scenarios/create" component={ScenarioForm} />
                        <PrivateRoute exact path="/scenarios/description/:id" component={ScenarioDescription} />
                        <PrivateRoute exact path="/products/scenario/:id" component={ProductsList} />
                        <PrivateRoute exact path="/products/scenario/:id_scenario/create" component={ProductsForm} />
                        <PrivateRoute exact path="/products/update/:id" component={ProductsForm} />
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { loading } = state.loader
    const alert = Object.keys(state.alert).length ? state.alert : false
    return {
        loggedIn,
        loading,
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 