import axios from 'axios'
import api from '../../config/api/endpoints'
import { getConfig, getErrorResponse } from '../utils/utils'
import history from '../../config/history'

const initialState = {
  user: {},
  permissions: [],
  error: {},
  isAuthenticated: false,
}

const LOGIN_USER = 'LOGIN_USER'
const QUERY_ERROR = 'QUERY_ERROR'

// ACTIONS
export const loginAction = (data) => ({
  type: LOGIN_USER, data
})

export const queryError = data => ({
    type: QUERY_ERROR, data
})

// FUNCTIONS
export const login = (email, password) => dispatch => {
  axios.post(api.login, { email, password })
    .then(res => res.data.data)
    .then(data => {
      dispatch(loginAction(data))
      history.push('/')
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(getErrorResponse(err))
      }
    })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: {
          email: action.data.email,
          token: action.data.token,
          id: action.data.id,
          name: action.data.name
        },
        permissions: action.data.permissions,
        isAuthenticated: true
      }
    case QUERY_ERROR:
      return { 
        ...state
      }
    default:
      return state
  }
}