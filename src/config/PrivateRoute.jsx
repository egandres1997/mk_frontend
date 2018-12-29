import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

export class PrivateRoute extends React.Component {

  constructor(props) {
    super(props)
  }

  redirect() {
    if (!this.props.isAuthenticated) {
      return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
    } else {
      return (
      	<Route 
      		exact={this.props.exact} 
      		path={this.props.path} 
      		render={rest => (
      			<this.props.layout {...rest} component={this.props.component} />
      		)} />)
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

export default withRouter(connect(mapStateToProps)(PrivateRoute))
