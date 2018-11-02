import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/left-navbar.css';

export const LeftNavbar = () => {
	return (
		<div className="col-sm-2 leftNavbar">
            <ul>
                <li className="sweep-to-right">
                    <Link to="/">Home</Link>
                </li>
                <li className="sweep-to-right">
                    <Link to="/scenarios">Escenarios</Link>
                </li>
            </ul>
        </div>
	)
}