import config from 'config';
import { authHeader } from '../_helpers';

export const administrationService = {
    getAll,
    remove
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/scenarios/get_by_user/${authHeader('id').id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.rows) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function remove(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/scenarios/remove/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.rows) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}