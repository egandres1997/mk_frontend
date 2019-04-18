import React from 'react'
import ReactDOM from 'react-dom'
import configureStore, { history } from './config/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import '../dist/assets/css/style.css'

const render = (Component) => {
  ReactDOM.render(
    <Provider store={configureStore.store}>
      <PersistGate loading={null} persistor={configureStore.persistor}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <AppContainer>
              <Component />
            </AppContainer>
          </Router>
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    render(App)
  })
}

module.hot.accept()