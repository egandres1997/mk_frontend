import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import authReducer from '../app/reducers/authReducer'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const config = {
	key: 'primary',
	storage: storageSession
}

const rootReducer = persistCombineReducers(config, {
  authReducer
});

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        loggerMiddleware
    )
)

let persistor = persistStore(
    store,
    null,
    (
    ) => {
        store.getState()
    }
)

export default ({ store, persistor })