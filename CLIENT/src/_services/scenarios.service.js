import config from 'config';
import { authHeader } from '../_helpers';

export const scenariosService = {
    getAll,
    remove,
    getByID,
    updateScenario
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
                if(data.success) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function getByID(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/scenarios/get_by_id/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.row) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function updateScenario(id, scenario) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        },
        body: `id=${id}&name=${scenario.name}&description=${scenario.description}&brief=${scenario.brief}`
    };

    console.log(scenario)

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/scenarios/update`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.row) {
                    return resolve(data);
                }

                console.log(data)

                return reject(data.message)
            })
    })
}