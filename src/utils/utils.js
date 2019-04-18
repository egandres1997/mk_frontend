import configureStore from '../config/store'
import { setAction } from '../reducers/actionReducer'

export const getConfig = () => {
  	return {
  		headers: {
	    	'Authorization': configureStore.store.getState().authReducer.user.token,
		}
  	}
}

export const initialInputState = (data = {}) => {
	let { name, value, error, message, placeholder, required, type } = data
	return {
		name: name || '',
		value: value || '', 
		error: error || '', 
		message: message || '', 
		placeholder: placeholder || '', 
		required: required ? required : false,
		type: type || 'text'
	}
}

export const getErrorResponse = (err) => {
	if (err.response && err.response.status, err.response.data.code, err.response.data.message) {
		return setAction(true, err.response.data.code, err.response.data.message)
	} else {
		return setAction(true, 500, "Ocurrió un error inesperado.")
	}
}