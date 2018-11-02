import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions, loaderActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {

        dispatch(loaderActions.loading());
        dispatch(request({ email }));

        userService.login(email, password)
            .then((data) => {
                dispatch(success(data.user));
                dispatch(loaderActions.loaded());
                history.push('/');
            })
            .catch((error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
                dispatch(loaderActions.loaded());
            })

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}