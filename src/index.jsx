import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './config/store'
import App from './config/App'

import jquery from 'jquery'
import metismenu from 'metismenu'
import bootstrap from 'bootstrap'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './dist/assets/css/style.css'

render(
    <Provider store={store}>
	    <App />
    </Provider>,
    document.getElementById('root')
);