import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${email}&password=${password}`
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/security/login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.token) {
                    localStorage.setItem('jwtToken', JSON.stringify(data.token));
                    return resolve(data);
                }

                return reject(data)
            })
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}