export function authHeader(type) {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    switch (type) {
    	case 'token':
    		if (user && user.token) {
		        return { 'Authorization': 'Bearer ' + user.token };
		    } else {
		        return {};
		    }
    		break;
    	case 'id':
    		if (user && user.id) {
		        return { id: user.id };
		    } else {
		        return {};
		    }
    		break;
    	default:
    		if (user) {
		        return { user };
		    } else {
		        return {};
		    }
    		break;
    }
}