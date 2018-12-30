import axios from 'axios'
import api from '../../config/api/endpoints'
import { getConfig, getErrorResponse } from '../utils/utils'
import history from '../../config/history'
import _ from 'lodash'

const initialState = {
  allOrders: [],
  activeOrder: {},
  isLoaded: false
}

const REMOVE_PRODUCT_OF_THE_ORDER = 'REMOVE_PRODUCT_OF_THE_ORDER'
const SET_ALL_PRODUCTS_FOUND = 'SET_ALL_PRODUCTS_FOUND'
const CLEAR_ALL_MANAGER = 'CLEAR_ALL_MANAGER'
const ADD_PRODUCT_TO_THE_ORDER = 'ADD_PRODUCT_TO_THE_ORDER'
const SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER = 'SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER'
const SET_AMOUNT_RECEIVED_AND_RETURN_ACTION = 'SET_AMOUNT_RECEIVED_AND_RETURN_ACTION'
const SET_INITIAL_ORDERS = 'SET_INITIAL_ORDERS'
const SET_NEW_ACTIVE_ORDER = 'SET_NEW_ACTIVE_ORDER'
const ADD_NEW_ORDER = 'ADD_NEW_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
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

export const setInitialOrdersAction = () => ({
  type: SET_INITIAL_ORDERS
})

export const setNewActiveOrderAction = (order_id) => ({
  type: SET_NEW_ACTIVE_ORDER, order_id
})

export const addNewOrderAction = () => ({
  type: ADD_NEW_ORDER
})

export const removeOrderAction = () => ({
  type: REMOVE_ORDER
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

export const sendOrder = () => dispatch => {
  let config = getConfig()
  /*axios.post(api.articles + '/findLike', { toSearch }, config)
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
    })*/
}

// UTILS
export const removeProductOfTheOrder = (state, { product_id }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  let products = activeOrderCopy.productsAddedToTheOrder
  _.remove(products, { id: product_id })
  let totalAmountOrder = 0
  products.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  activeOrderCopy.totalAmountOrder = activeOrderCopy.amountReceived = activeOrderCopy.amountToReturn = totalAmountOrder
  return { activeOrder: activeOrderCopy }
}

export const addProductToTheOrder = (state, { product }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  let products = activeOrderCopy.productsAddedToTheOrder
  let currentProduct = _.find(products, { id: product.id })
  if(currentProduct) {
    currentProduct.qty = currentProduct.qty + 1
    currentProduct.total = currentProduct.qty * _.first(currentProduct.ListaPreciosDetalles).precio_de_venta
  } else {
    product.qty = 1
    product.total = _.first(product.ListaPreciosDetalles).precio_de_venta
    products.push(product)
  }
  let totalAmountOrder = 0
  products.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  activeOrderCopy.totalAmountOrder = activeOrderCopy.amountReceived = totalAmountOrder
  activeOrderCopy.amountToReturn = 0
  return { activeOrder: activeOrderCopy }
}

export const setNewQtyOnTheProduct = (state, { product_id, newQty }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  let products = activeOrderCopy.productsAddedToTheOrder
  let currentProduct = _.find(products, { id: product_id })
  currentProduct.qty = newQty !== "" ? Number(newQty) : newQty
  currentProduct.total = currentProduct.qty * _.first(currentProduct.ListaPreciosDetalles).precio_de_venta
  let totalAmountOrder = 0
  products.forEach(product => totalAmountOrder = totalAmountOrder + product.total)
  activeOrderCopy.totalAmountOrder = activeOrderCopy.amountReceived = totalAmountOrder
  activeOrderCopy.amountToReturn = 0
  return { activeOrder: activeOrderCopy }
}

export const setAmountReceivedAndReturn = (state, { value }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  let amountReceived = parseFloat(value)
  let amountToReturn = 0
  if(isNaN(amountReceived)) {
    activeOrderCopy.amountToReturn = - activeOrderCopy.totalAmountOrder
  } else {
    activeOrderCopy.amountToReturn = parseFloat(value) - activeOrderCopy.totalAmountOrder
  }
  activeOrderCopy.amountReceived = amountReceived
  return { activeOrder: activeOrderCopy }
}

export const setInitialOrders = (state) => {
  let allOrdersCopy = _.cloneDeep(state.allOrders)
  if(allOrdersCopy.length) {
    let activeOrderCopy = _.cloneDeep(state.activeOrder)
    _.remove(allOrdersCopy, { id: activeOrderCopy.id })
    allOrdersCopy.push(activeOrderCopy)
    let allOrdersAsc = _.orderBy(allOrdersCopy, 'id')
    return { allOrders: allOrdersAsc, activeOrder: _.first(allOrdersAsc), isLoaded: true }
  }
  let newOrder = orderFormat(1)
  return { allOrders: [newOrder], activeOrder: newOrder, isLoaded: true }
}

export const setAllProductsFound = (state, { data }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  activeOrderCopy.allProductsFound = data
  return { activeOrder: activeOrderCopy }
}

export const setNewActiveOrder = (state, { order_id }) => {
  let activeOrderCopy = _.cloneDeep(state.activeOrder)
  let allOrdersCopy = _.cloneDeep(state.allOrders)
  _.remove(allOrdersCopy, { id: activeOrderCopy.id })
  allOrdersCopy.push(activeOrderCopy)
  let allOrdersAsc = _.orderBy(allOrdersCopy, 'id')
  let newOrderCopy = _.find(allOrdersCopy, { id: order_id })
  return { allOrders: allOrdersAsc, activeOrder: newOrderCopy }
}

export const orderFormat = (order_id) => {
  return {
    id: order_id,
    productsAddedToTheOrder: [],
    allProductsFound: [],
    totalAmountOrder: 0,
    amountReceived: 0,
    amountToReturn: 0
  }
}

export const addNewOrder = (state) => {
  let allOrdersCopy = _.cloneDeep(state.allOrders)
  let lastOrder = _.last(allOrdersCopy)
  let newOrder = orderFormat(lastOrder.id + 1)
  allOrdersCopy.push(newOrder)
  let allOrdersAsc = _.orderBy(allOrdersCopy, 'id')
  return { allOrders: allOrdersAsc, activeOrder: newOrder }
}

export const removeOrder = (state) => {
  let allOrdersCopy = _.cloneDeep(state.allOrders)
  let activeOrderKey = Number(_.findKey(allOrdersCopy, { id: state.activeOrder.id }))
  _.remove(allOrdersCopy, { id: state.activeOrder.id })
  if(!allOrdersCopy.length) {
    allOrdersCopy.push(orderFormat(1))
    activeOrderKey = 0
  }
  let newActiveOrder = allOrdersCopy[activeOrderKey ? activeOrderKey - 1 : 0]
  return { allOrders: allOrdersCopy, activeOrder: newActiveOrder }
} 

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_OF_THE_ORDER:
      return {
        ...state,
        ...removeProductOfTheOrder(state, action)
      }
    case SET_ALL_PRODUCTS_FOUND:
      return {
        ...state,
        ...setAllProductsFound(state, action)
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
      return {
        ...state,
        ...addProductToTheOrder(state, action)
      }
    case SET_QTY_OF_PRODUCT_ADDED_ON_THE_ORDER:
      return {
        ...state,
        ...setNewQtyOnTheProduct(state, action)
      }
    case SET_AMOUNT_RECEIVED_AND_RETURN_ACTION:
      return {
        ...state,
        ...setAmountReceivedAndReturn(state, action)
      }
    case SET_INITIAL_ORDERS:
      return {
        ...state,
        ...setInitialOrders(state)
      }
    case SET_NEW_ACTIVE_ORDER:
      return {
        ...state,
        ...setNewActiveOrder(state, action)
      }
    case ADD_NEW_ORDER:
      return {
        ...state,
        ...addNewOrder(state)
      }
    case REMOVE_ORDER:
      return {
        ...state,
        ...removeOrder(state)
      }
    case QUERY_ERROR:
      return { 
        ...state
      }
    default:
      return state
  }
}