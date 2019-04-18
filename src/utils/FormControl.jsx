import React, { Component } from 'react'

export class Placeholder extends Component {
	render() {
		return (
			<div className="form-group">
		        <input 
		        	{...this.props} 
		            className="form-control" 
		        />
		    </div>
		)
	}
}