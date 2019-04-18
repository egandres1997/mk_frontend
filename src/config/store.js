import mainReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { persistStore } from 'redux-persist'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

let store = createStore(
  mainReducer(history),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
      createLogger({ collapsed: true })
    )
  )
)
let persistor = persistStore(
  store,
  null,
  () => store.getState()
)

export default ({ store, persistor })

