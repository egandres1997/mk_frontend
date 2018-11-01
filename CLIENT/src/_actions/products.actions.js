import { productsConstants, alertConstants } from '../_constants';
import { productsService } from '../_services';
import { history } from '../_helpers';

export const productsActions = {
    getAllByScenario,
    editProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    createProduct
};

function getAllByScenario(id_scenario) {
    return dispatch => {

        productsService.getAllByScenario(id_scenario)
            .then((results) => {
                dispatch(success(results.rows))
            })
            .catch((error) => {
                console.log(error)
            })

    };

    function success(rows) { return { type: productsConstants.GETALL_SUCCESS, rows } }
}

function editProduct(id) {
    return dispatch => {
        
        history.push(`/products/update/${id}`)

    }
}

function deleteProduct(id) {
    return dispatch => {

        productsService.remove(id)
        
    }
}

function getProductById(id) {
    return dispatch => {

        productsService.getByIdForUser(id)
            .then((results) => {
                console.log(results)
                dispatch(success(results.row))
            })
            .catch((error) => {
                console.log(error)
            })
    };

    function success(row) { return { type: productsConstants.GETBYID_SUCCESS, row } }
}

function updateProduct(id, product) {
    return dispatch => {

          productsService.update(id, product)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    };
}

function createProduct(id_scenario, product) {
    return dispatch => {

        productsService.create(id_scenario, product)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })

    }
}