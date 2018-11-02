import React from 'react';

export const Button = (props) => {
	return (
		<button className={props.btnClass} onClick={props.action} onClick={props.action}>
			{props.title}
		</button>
	)
}