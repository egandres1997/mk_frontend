import { scenariosConstants, alertConstants } from '../_constants';
import { loaderActions, alertAction } from '../_actions';
import { scenariosService } from '../_services';
import { history } from '../_helpers';

export const scenariosActions = {
    getAllScenarios,
    deleteScenario,
    editScenario,
    getScenarioById,
    updateScenario,
    createScenario,
    redirectToProducts,
    redirectToCreateForm
};

function getAllScenarios() {
    return dispatch => {

        dispatch(loaderActions.loading());

        scenariosService.getAll()
            .then((data) => {
                dispatch(success(data.rows));
                dispatch(loaderActions.loaded());
            })
            .catch((error) => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            }) 

    };

    function success(rows) { return {  type: scenariosConstants.GETALL_SUCCESS, rows } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function deleteScenario(id) {
    return dispatch => {

        dispatch(loaderActions.loading());
        
        scenariosService.remove(id)
            .then((data) => {
                history.go()
            })
            .catch((error) => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            })

    };

    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function editScenario(id) {
    return dispatch => {
        history.push(`/scenarios/update/${id}`);
    };
}

function getScenarioById(id) {
    return dispatch => {

        dispatch(loaderActions.loading());

        scenariosService.getByIDForUser(id)
            .then((data) => {
                dispatch(success(data));
                dispatch(loaderActions.loaded());
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(loaderActions.loaded());
            })
    };

    function success(scenario) { return { type:  scenariosConstants.GETBYID_SUCCESS, scenario } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function updateScenario(id, scenario) {
    return dispatch => {

        dispatch(loaderActions.loading());

        scenariosService.updateScenario(id, scenario)
            .then((data) => {
                dispatch(loaderActions.loaded());
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(loaderActions.loaded());
            })
    };

    function success(message) { return { type:  alertConstants.SUCCESS, message } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function createScenario(scenario) {
    return dispatch => {

        dispatch(loaderActions.loading());

        scenariosService.createScenario(scenario)
            .then((data) => {
                dispatch(loaderActions.loaded());
                history.push(`/scenarios`)
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(loaderActions.loaded());
            })
    };

    function success(message) { return { type:  alertConstants.SUCCESS, message } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function redirectToProducts(id) {
    return dispatch => {
        history.push(`/products/scenario/${id}`)
    }
}

function redirectToCreateForm() {
    return dispatch => {
        history.push(`/scenarios/create`)
    }
}