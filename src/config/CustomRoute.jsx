import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import history from './history'

export class CustomRoute extends React.Component {

  constructor(props) {
    super(props)
  }

  redirect() {
    if (!this.props.isAuthenticated) {
      return (
      	<Route 
					exact={this.props.exact} 
					path={this.props.path}
					render={rest => (
						<this.props.layout component={this.props.component} {...rest} />
					)} 
				/>
			)
    } else {
      return <Redirect to={{ pathname: this.props.match.path, state: { from: '/login' } }} />
    }
  }

  render() {
    return this.redirect()
  }
}

const mapStateToProps = (state) => {
  	return {
    	isAuthenticated: state.authReducer.isAuthenticated
  	}
}

export default withRouter(connect(mapStateToProps)(CustomRoute))
