import React from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomRoute from './utils/CustomRoute'
import PrivateRoute from './utils/PrivateRoute'
import routes from './routes'
import Toast from './utils/Toast'

import '../dist/assets/css/App.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {routes.WithoutSession.map((route, key) => (
                        <CustomRoute {...route} key={key} />
                    ))}
                    {routes.Privates.map((route, key) => (
                        <PrivateRoute {...route} key={key} />
                    ))}
                </Switch>
                <Toast action={this.props.action} />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        action: state.actionReducer
    }
}

export default withRouter(connect(mapStateToProps)(App))