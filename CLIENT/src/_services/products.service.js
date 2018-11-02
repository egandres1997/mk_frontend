import config from 'config';
import { authHeader } from '../_helpers';

export const productsService = {
    getAllByScenario,
    remove,
    getByIdForUser,
    update,
    create
};

function getAllByScenario(id_scenario) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/products/get_all_by_scenario/${id_scenario}`, requestOptions)
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
        fetch(`${config.apiUrl}/api/v1/products/remove/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function getByIdForUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/products/get_by_id_for_user/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success && data.row) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function update(id, product) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        },
        body: `id=${id}&name=${product.name}&price=${product.price}&earnings=${product.earnings}&solds=${product.solds}`
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/products/update`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}

function create(id_scenario, product) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader('token').Authorization
        },
        body: `id_scenario=${id_scenario}&name=${product.name}&price=${product.price}&earnings=${product.earnings}&solds=${product.solds}&img_route=${product.img_route}`
    };

    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/v1/products/create_for_user_and_scenario`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    return resolve(data);
                }

                return reject(data.message)
            })
    })
}