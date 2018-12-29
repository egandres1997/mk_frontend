import React from 'react'
import { Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomRoute from './CustomRoute'
import PrivateRoute from './PrivateRoute'
import routes from './routes'

import '../dist/assets/css/App.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                {routes.PublicsWithoutSession.map((route, key) => (
                    <CustomRoute {...route} key={key}/>
                ))}
                {routes.Privates.map((route, key) => (
                    <PrivateRoute {...route} key={key}/>
                ))}
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

export default withRouter(connect(mapStateToProps)(App))