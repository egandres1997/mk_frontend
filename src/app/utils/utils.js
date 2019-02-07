import configureStore from '../../config/store'

export const getConfig = () => {
  	return {
  		headers: {
	    	'Authorization': configureStore.store.getState().authReducer.user.token,
		}
  	}
}

export const getErrorResponse = (err) => {
  let messageContainer = err.response.data.message.msg
  let message = (Array.isArray(messageContainer))? messageContainer[0].message : messageContainer
  return { status: err.response.status, message: message }
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