import React from 'react';

export const Header = ({ handleClickLogout }) => {
	return (
		<nav className="navbar navbar-inverse">
		  <div className="container-fluid">
		    	<div className="navbar-header">
		      		<a className="navbar-brand" href="#">AdHouse</a>
		    	</div>
		    	<button className="btn btn-danger navbar-btn pull-right" onClick={handleClickLogout}>
		    		Cerrar Sesión
		    	</button>
		  	</div>
		</nav>
	)
}