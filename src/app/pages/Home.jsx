import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Home)