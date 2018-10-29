import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { history } from './_helpers';
import { PrivateRoute } from './_components';
import { store } from './_helpers';

render(
    <Provider store={store}>
        <Router history={history}>
        	<div>
	            <Route path="/login" component={LoginPage} />
	            <PrivateRoute exact path="/" component={HomePage} />
	        </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);