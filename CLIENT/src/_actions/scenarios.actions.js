import { scenariosConstants, alertConstants } from '../_constants';
import { scenariosService } from '../_services';
import { history } from '../_helpers';

export const scenariosActions = {
    getAllScenarios,
    deleteScenario,
    editScenario,
    getScenarioById,
    updateScenario,
    createScenario
};

function getAllScenarios() {
    return dispatch => {

        dispatch(request());

        scenariosService.getAll()
            .then((data) => {
                dispatch(success(data.rows))
            })
            .catch((error) => {
                dispatch(failure(error.message));
            })

    };

    // el request tiene que cargar un loader
    function request() { return { type: scenariosConstants.GETALL_REQUEST} }
    function success(rows) { return { type:  scenariosConstants.GETALL_SUCCESS, rows } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function deleteScenario(id) {
    return dispatch => {

        dispatch(request())
        
        scenariosService.remove(id)
            .then((data) => {
                dispatch(getAllScenarios())
                dispatch(success(data.message))
            })
            .catch((error) => {
                dispatch(failure(error.message));
            })

    };

    // el request tiene que cargar un loader
    function request() { return { type: scenariosConstants.DELETE_REQUEST } }
    function success(message) { return { type:  alertConstants.SUCCESS, message } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function editScenario(id) {
    return dispatch => {

        history.push(`/scenarios/update/${id}`);

    };
}

function getScenarioById(id) {
    return dispatch => {

        scenariosService.getByIDForUser(id)
            .then((data) => {
                dispatch(success(data))
            })
            .catch((error) => {
                dispatch(failure(error));
            })
    };

    // el request tiene que cargar un loader
    function request() { return { type: scenariosConstants.GETBYID_REQUEST } }
    function success(scenario) { return { type:  scenariosConstants.GETBYID_SUCCESS, scenario } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function updateScenario(id, scenario) {
    return dispatch => {

        scenariosService.updateScenario(id, scenario)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
}

function createScenario(scenario) {
    return dispatch => {

        scenariosService.createScenario(scenario)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
}