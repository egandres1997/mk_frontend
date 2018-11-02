import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout
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
                if(data.success && data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    return resolve(data);
                }

                return reject(data)
            })
    })
}

function logout() {
    return localStorage.removeItem('user');
}