import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Login Page
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Login)