import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { scenarios } from './scenarios.reducer';
import { products } from './products.reducer';
import { loader } from './loader.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  scenarios,
  products,
  loader
});

export default rootReducer;