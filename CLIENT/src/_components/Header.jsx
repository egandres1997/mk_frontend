import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';
import { Button } from '../_components';

export const Header = ({ logout }) => {
	return (
		<nav className="topNavbar">
		  <div className="container-fluid">
		    	<div className="navbar-header">
		      		<Link className="navbar-brand" to="/">AdHouse</Link>
		    	</div>
		    	<Button 
					btnClass="btn btn-danger navbar-btn pull-right" 
					title="Cerrar Sesión"
					action={logout}
				/>
		  	</div>
		</nav>
	)
}