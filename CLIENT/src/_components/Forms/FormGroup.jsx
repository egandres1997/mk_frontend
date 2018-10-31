import React from 'react';

export const FormGroup = (props) => {
	return (
		<div className="form-group">
	    	<label className={`control-label ${props.attributes.labelCol}`} htmlFor={props.attributes.controlName}>{props.attributes.label}</label>
	    	<div className="col-sm-10">
	      		{props.children}
	    	</div>
	  	</div>
	)
}