import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { scenarios } from './scenarios.reducer';
import { products } from './products.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  scenarios,
  products
});

export default rootReducer;