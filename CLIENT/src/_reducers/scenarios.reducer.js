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
    case scenariosConstants.GETBYID_SUCCESS:
      return {
        onEdition: action.scenario.row
      };
    case scenariosConstants.GETBYID_SUCCESS_DESCRIPTION:
      return {
        description: action.scenario
      };
    default:
      return state
  }
}