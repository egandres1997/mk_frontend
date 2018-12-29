import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const CustomRoute = (props) => {
	return (
		<Route 
			exact={props.exact} 
			path={props.path}
			render={rest => (
				<props.layout component={props.component} {...rest} />
			)} 
		/>
	)
}

export default CustomRoute
