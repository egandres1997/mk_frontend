import { scenariosConstants, alertConstants } from '../_constants';
import { administrationService } from '../_services'

export const administrationActions = {
    getAllScenarios,
    deleteScenario
};

function getAllScenarios() {
    return dispatch => {

        dispatch(request());

        administrationService.getAll()
            .then((data) => {
                dispatch(success(data.rows))
            })
            .catch((error) => {

            })

    };

    function request() { return { type: scenariosConstants.GETALL_REQUEST} };
    function success(rows) { return { type:  scenariosConstants.GETALL_SUCCESS, rows } }
    function failure(error) { return { type: scenariosConstants.GETALL_FAILURE } }
}

function deleteScenario(id) {
    return dispatch => {
        
        administrationService.remove(id)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })

    };

    function request() { return { type: scenariosConstants.GETALL_REQUEST} };
    function success(rows) { return { type:  scenariosConstants.GETALL_SUCCESS, rows } }
    function failure(error) { return { type: scenariosConstants.GETALL_FAILURE } }
}
