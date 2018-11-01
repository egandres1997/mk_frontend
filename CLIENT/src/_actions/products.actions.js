import { productsConstants, alertConstants } from '../_constants';
import { productsService } from '../_services';
import { history } from '../_helpers';

export const productsActions = {
    getAllByScenario   
};

function getAllByScenario(id_scenario) {
    return dispatch => {

        productsService.getAllByScenario(id_scenario)
            .then((results) => {
                console.log(results)
            })
            .catch((error) => {
                console.log(error)
            })

    };
}