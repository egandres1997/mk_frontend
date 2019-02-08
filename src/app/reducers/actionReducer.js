import axios from 'axios'
import api from '../../config/api/endpoints'
import { getConfig, getErrorResponse } from '../utils/utils'
import history from '../../config/history'
import _ from 'lodash'

const initialState = {
  shouldItBeSeen: false,
  actionStatus: null,
  actionMessage: ''
}

const SET_ACTION = 'SET_ACTION'

export const setAction = (shouldItBeSeen, actionStatus, actionMessage) => ({
  type: SET_ACTION, shouldItBeSeen, actionStatus, actionMessage
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION:
      return {
        ...state,
        shouldItBeSeen: action.shouldItBeSeen,
        actionStatus: action.actionStatus,
        actionMessage: action.actionMessage ||''
      }
    default:
      return state
  }
}