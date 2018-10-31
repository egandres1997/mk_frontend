import React from 'react';
import { Link } from 'react-router-dom';

export const LeftNavbar = () => {
	return (
		<div className="col-sm-3">
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/scenarios">Administración</Link>
                </li>
            </ul>
        </div>
	)
}