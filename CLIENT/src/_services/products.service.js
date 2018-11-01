import config from 'config';
import { authHeader } from '../_helpers';

export const productsService = {
    getAllByScenario
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