import React from 'react';

export const LeftNavbar = () => {
	return (
		<div className="col-sm-3">
            <ul className="list-group">
                <li className="list-group-item">
                    <a href="/">
                        Home
                    </a>
                    <span className="badge">12</span>
                </li>
                <li className="list-group-item">
                    <a href="/scenarios">
                        Administración
                    </a>
                </li>
            </ul>
        </div>
	)
}