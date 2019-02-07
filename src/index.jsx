import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './config/store'
import App from './config/App'
import history from './config/history'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import jquery from 'jquery'
import metismenu from 'metismenu'
import bootstrap from 'bootstrap'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './dist/assets/css/style.css'

render(
    <Provider store={configureStore.store}>
    	<PersistGate loading={null} persistor={configureStore.persistor}>
			<Router history={history}>
			    <App />
			</Router>
		</PersistGate>
    </Provider>,
    document.getElementById('root')
);