import { loaderConstants } from '../_constants';

export const loaderActions = {
    loading,
    loaded
};

function loading() {
	return { type: loaderConstants.LOADING };
}

function loaded() {
	return { type: loaderConstants.LOADED };
}