import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import Login from '../app/pages/Login'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Route path="/login" component={Login} />
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

export default connect(mapStateToProps)(App)