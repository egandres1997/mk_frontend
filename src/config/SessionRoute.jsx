import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const SessionRoute = (props) => {
	if(!props.isAuthenticated) {
		return (
			<Route 
				path={props.path} 
				exact={props.exact} 
				render={rest => (
					<props.layout {...rest} component={props.toRender} />
				)}
			/>
		)
	}
	return (
		<Redirect to={{ pathname: '/', state: { from: props.location } }} />
	)
}

export default SessionRoute
