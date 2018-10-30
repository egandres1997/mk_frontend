import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
	constructor(props) {
		super(props)

		
	}

	render() {
		return (
            <div></div>
        )
	}
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home }; 