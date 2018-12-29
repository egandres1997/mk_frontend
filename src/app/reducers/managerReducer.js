import axios from 'axios'
import api from '../../config/api/endpoints'
import { getConfig, getErrorResponse } from '../utils/utils'
import history from '../../config/history'
import _ from 'lodash'

const initialState = {
  allProductsFound: [],
  productsAddedToTheOrder: [],
  totalAmountOrder: 0,
  amountReceived: 0,
  amountToReturn: 0
}

const REMOVE_PRODUCT_OF_THE_ORDER = 'REMOVE_PRODUCT_OF_THE_ORDER'
const SET_ALL_PRODUCTS_FOUND = 'SET_ALL_PRODUCTS_FOUND'
const CLEAR_ALL_MANAGER = 'CLEAR_ALL_MANAGER'
const ADD_PRODUCT_TO_THE_ORDER = 'ADD_PRODUCT_TO_THE_ORDER'
const SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER = 'SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER'
const SET_AMOUNT_RECEIVED_AND_RETURN_ACTION = 'SET_AMOUNT_RECEIVED_AND_RETURN_ACTION'
const QUERY_ERROR = 'QUERY_ERROR'

// ACTIONS
export const removeProductOfTheOrderAction = (product_id) => ({
  type: REMOVE_PRODUCT_OF_THE_ORDER, product_id
})

export const clearAllManagerAction = () => ({
  type: CLEAR_ALL_MANAGER
})

export const searchProductsAction = (data) => ({
  type: SET_ALL_PRODUCTS_FOUND, data
})

export const addProductToTheOrderAction = (product) => ({
  type: ADD_PRODUCT_TO_THE_ORDER, product
})

export const setQtyOfProductAddedOnTheOrderAction = (product_id, newQty) => ({
  type: SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER, product_id, newQty
})

export const setAmountReceivedAndReturnAction = (value) => ({
  type: SET_AMOUNT_RECEIVED_AND_RETURN_ACTION, value
})

// FUNCTIONS
export const searchProducts = (toSearch) => dispatch => {
  let config = getConfig()
  axios.post(api.articles + '/findLike', { toSearch }, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(searchProductsAction(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(getErrorResponse(err))
      }
    })
}

// UTILS
export const removeProductOfTheOrder = (state, { product_id }) => {
  let productsCopy = _.cloneDeep(state.productsAddedToTheOrder)
  _.remove(productsCopy, { id: product_id })
  let totalAmountOrder = 0
  productsCopy.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  return { productsAddedToTheOrder: productsCopy, totalAmountOrder }
}

export const addProductToTheOrder = (state, { product }) => {
  let productsCopy = _.cloneDeep(state.productsAddedToTheOrder)
  let currentProduct = _.find(productsCopy, { id: product.id })
  if(currentProduct) {
    currentProduct.qty = currentProduct.qty + 1
    currentProduct.total = currentProduct.qty * _.first(currentProduct.ListaPreciosDetalles).precio_de_venta
  } else {
    product.qty = 1
    product.total = _.first(product.ListaPreciosDetalles).precio_de_venta
    productsCopy.push(product)
  }
  let totalAmountOrder = 0
  productsCopy.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  return { productsAddedToTheOrder: productsCopy, totalAmountOrder }
}

export const setNewQtyOnTheProduct = (state, { product_id, newQty }) => {
  let productsCopy = _.cloneDeep(state.productsAddedToTheOrder)
  let currentProduct = _.find(productsCopy, { id: product_id })
  currentProduct.qty = newQty !== "" ? Number(newQty) : newQty
  currentProduct.total = currentProduct.qty * _.first(currentProduct.ListaPreciosDetalles).precio_de_venta
  let totalAmountOrder = 0
  productsCopy.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  return { productsAddedToTheOrder: productsCopy, totalAmountOrder }
}

export const setAmountReceivedAndReturn = (state, { value }) => {
  let amountReceived = parseFloat(value)
  let amountToReturn = 0
  if(isNaN(amountReceived)) {
    amountToReturn = - state.totalAmountOrder
  } else {
    amountToReturn = parseFloat(value) - state.totalAmountOrder
  }
  return { amountReceived, amountToReturn }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_OF_THE_ORDER:
      let remove = removeProductOfTheOrder(state, action)
      return {
        ...state,
        productsAddedToTheOrder: remove.productsAddedToTheOrder,
        totalAmountOrder: remove.totalAmountOrder,
        amountReceived: remove.totalAmountOrder,
        amountToReturn: remove.totalAmountOrder
      }
    case SET_ALL_PRODUCTS_FOUND:
      return {
        ...state,
        allProductsFound: action.data
      }
    case CLEAR_ALL_MANAGER:
      return {
        ...state,
        allProductsFound: [],
        productsAddedToTheOrder: [],
        totalAmountOrder: 0,
        amountReceived: 0,
        amountToReturn: 0
      }
    case ADD_PRODUCT_TO_THE_ORDER:
      let add = addProductToTheOrder(state, action)
      return {
        ...state,
        productsAddedToTheOrder: add.productsAddedToTheOrder,
        totalAmountOrder: add.totalAmountOrder,
        amountReceived: add.totalAmountOrder,
        amountToReturn: 0
      }
    case SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER:
      let set = setNewQtyOnTheProduct(state, action)
      return {
        ...state,
        productsAddedToTheOrder: set.productsAddedToTheOrder,
        totalAmountOrder: set.totalAmountOrder,
        amountReceived: set.totalAmountOrder,
        amountToReturn: 0
      }
    case SET_AMOUNT_RECEIVED_AND_RETURN_ACTION:
      let _set = setAmountReceivedAndReturn(state, action)
      return {
        ...state,
        amountReceived: _set.amountReceived,
        amountToReturn: _set.amountToReturn
      }
    case QUERY_ERROR:
      return { 
        ...state
      }
    default:
      return state
  }
}