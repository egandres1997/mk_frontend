import React from 'react';

export const Form = (props) => {
	return (
		<form className="form-horizontal" onSubmit={props.submittedAction}>
			{props.children}
		</form>
	)
}