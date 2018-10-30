import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { scenarios } from './scenarios.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  scenarios
});

export default rootReducer;