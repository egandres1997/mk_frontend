import { productsConstants } from '../_constants';

export function products(state = {}, action) {
  switch (action.type) {
  	case productsConstants.GETALL_SUCCESS:
		return {
			rows: action.rows
		}
  	case productsConstants.GETBYID_SUCCESS:
		return {
			onEdition: action.row
		}
    default:
      return state
  }
}