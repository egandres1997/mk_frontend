import { loaderConstants } from '../_constants';

export function loader(state = {}, action) {
  switch (action.type) {
    case loaderConstants.LOADING:
      return {
      	loading: true
      };
    break;
    case loaderConstants.LOADED:
      return {
      	loading: false
      };
    break;
    default:
      return state
  }
}