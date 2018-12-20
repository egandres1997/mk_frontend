import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'
import routes from './routes'
import PrivateRoute from './PrivateRoute'
import SessionRoute from './SessionRoute'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routes.Privates.map((Component, index) => {
                        return (
                            <PrivateRoute 
                                isAuthenticated={this.props.isAuthenticated}
                                {...Component} 
                                key={index}
                            />
                        )
                    })}
                    {routes.Publics.map((Component, index) => {
                        return (
                            <SessionRoute 
                                isAuthenticated={this.props.isAuthenticated}
                                {...Component} 
                                key={index}
                            />
                        )
                    })}
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

export default connect(mapStateToProps)(App)