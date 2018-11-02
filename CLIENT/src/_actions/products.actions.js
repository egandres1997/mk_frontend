import { productsConstants, alertConstants } from '../_constants';
import { loaderActions } from '../_actions';
import { productsService } from '../_services';
import { base64 } from '../_helpers';
import { history } from '../_helpers';

export const productsActions = {
    getAllByScenario,
    editProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    createProduct,
    redirectToCreateForm
};

function getAllByScenario(id_scenario) {
    return dispatch => {

        dispatch(loaderActions.loading());

        productsService.getAllByScenario(id_scenario)
            .then((results) => {
                dispatch(success(results.rows))
                dispatch(loaderActions.loaded());
            })
            .catch((error) => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            })

    };

    function success(rows) { return { type: productsConstants.GETALL_SUCCESS, rows } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function editProduct(id) {
    return dispatch => {
        history.push(`/products/update/${id}`)
    }
}

function deleteProduct(id) {
    return dispatch => {

        dispatch(loaderActions.loading());

        productsService.remove(id)
            .then(result => {
                history.go()
            })
            .catch(error => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            })
    }

    function success(rows) { return { type: productsConstants.GETALL_SUCCESS, rows } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function getProductById(id) {
    return dispatch => {

        dispatch(loaderActions.loading());

        productsService.getByIdForUser(id)
            .then((results) => {
                dispatch(success(results.row));
                dispatch(loaderActions.loaded());
            })
            .catch((error) => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            })
    };

    function success(row) { return { type: productsConstants.GETBYID_SUCCESS, row } }
    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function updateProduct(id, product) {
    return dispatch => {

        dispatch(loaderActions.loading());

        productsService.update(id, product)
            .then((result) => {
                history.goBack()
            })
            .catch((error) => {
                dispatch(failure(error.message));
                dispatch(loaderActions.loaded());
            })
    };

    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function createProduct(id_scenario, product) {
    return dispatch => {

        dispatch(loaderActions.loading());

        base64(product.img_route)
            .then(result => {

                product.img_route = encodeURIComponent(window.btoa(result));

                productsService.create(id_scenario, product)
                    .then((result) => {
                        history.goBack()
                    })
                    .catch((error) => {
                        dispatch(failure(error.message));
                        dispatch(loaderActions.loaded());
                    })
            })
            .catch(error => {
                console.log(error)
            })

    };

    function failure(message) { return { type: alertConstants.ERROR, message } }
}

function redirectToCreateForm(id_scenario) {
    return dispatch => {
        history.push(`/products/scenario/${id_scenario}/create`)
    }
}