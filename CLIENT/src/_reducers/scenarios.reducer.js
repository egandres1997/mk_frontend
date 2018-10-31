import { scenariosConstants } from '../_constants';

export function scenarios(state = {}, action) {
  switch (action.type) {
    case scenariosConstants.GETALL_SUCCESS:
      return {
        rows: action.rows
      };
    case scenariosConstants.GETALL_REQUEST:
      return {
        requestSubmitted: true
      };
    default:
      return state
  }
}