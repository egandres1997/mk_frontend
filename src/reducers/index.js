import authReducer from './authReducer'
import actionReducer from './actionReducer'
import managerReducer from './managerReducer'
import storageSession from 'redux-persist/lib/storage/session'
import { connectRouter } from 'connected-react-router'
import { persistCombineReducers } from 'redux-persist'

const config = {
  key: 'primary',
  storage: storageSession
}

export default (history) => {
  let appReducer = persistCombineReducers(config, {
    router: connectRouter(history),
    authReducer,
    actionReducer,
    managerReducer
  })
  
  return (state, action) => {
    return appReducer(state, action)
  }
}