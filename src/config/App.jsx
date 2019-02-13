import React from 'react'
import { Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomRoute from './CustomRoute'
import PrivateRoute from './PrivateRoute'
import routes from './routes'
import Toast from '../app/components/Toast'
import { loadNavigationData } from '../app/reducers/authReducer'

import '../dist/assets/css/App.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {this.props.navigation.isLoaded && 
                        routes.Privates.map((route, key) => (
                            <PrivateRoute {...route} key={key}/>
                        ))
                    }
                    {routes.PublicsWithoutSession.map((route, key) => (
                        <CustomRoute {...route} key={key}/>
                    ))}
                </Switch>
                <Toast action={this.props.action}/>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadNavigationData: () => {
            dispatch(loadNavigationData())
        }
    }
}

function mapStateToProps(state) {
    return {
        action: state.actionReducer,
        navigation: state.authReducer.navigation
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))