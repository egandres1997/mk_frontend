import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import {
  removeProductOfTheOrderAction,
  clearAllManagerAction,
  setInitialOrdersAction,
  searchProducts,
  addProductToTheOrderAction,
  setQtyOfProductAddedOnTheOrderAction,
  setAmountReceivedAndReturnAction,
  setNewActiveOrderAction,
  addNewOrderAction,
  removeOrderAction,
  sendOrder
} from '../reducers/managerReducer'
import ProductsGrid from '../components/ProductsGrid'
import ProductsOrder from '../components/ProductsOrder'

class SaleManager extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('body').addClass('mini-navbar')
    //this.props.clearAllManager()
    this.props.setInitialOrders()

  }

  onClickOrder(order_id) {
    this.props.setNewActiveOrder(order_id)
  }

  onClickNewOrder() {
    this.props.addNewOrder()
  }

  getSaleManager() {
    if (this.props.isLoaded) {
      return (
        <React.Fragment>
          <div className="col-lg-12 ordersButtons">
            {this.props.allOrders.map((order, key) => {
              return (
                <button
                  style={{ marginBottom: '20px' }}
                  className={`btn btn-primary ${this.props.activeOrder.id !== order.id ? 'btn-outline' : ''}`}
                  key={key}
                  onClick={this.onClickOrder.bind(this, order.id)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> {key + 1}
                </button>

              )
            })}
            <button
              style={{ marginBottom: '20px' }}
              className="btn btn-warning"
              onClick={this.onClickNewOrder.bind(this)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="col-lg-7">
            <ProductsGrid
              itemWidth="col-md-4"
              activeOrderId={this.props.activeOrder.id}
              products={this.props.activeOrder.allProductsFound}
              searchProducts={this.props.searchProducts}
              addProductToTheOrder={this.props.addProductToTheOrder}
            />
          </div>
          <div className="col-lg-5">
            <ProductsOrder
              products={this.props.activeOrder.productsAddedToTheOrder}
              totalAmountOrder={this.props.activeOrder.totalAmountOrder}
              amountReceived={this.props.activeOrder.amountReceived}
              amountToReturn={this.props.activeOrder.amountToReturn}
              removeProductOfTheOrder={this.props.removeProductOfTheOrder}
              setQtyOfProductAddedOnTheOrder={this.props.setQtyOfProductAddedOnTheOrder}
              setAmountReceivedAndReturn={this.props.setAmountReceivedAndReturn}
              removeOrder={this.props.removeOrder}
              sendOrder={this.props.sendOrder}
            />
          </div>
        </React.Fragment>
      )
    }
    return <div>Cargando...</div>
  }

  render() {
    return (
      <React.Fragment>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-12">
            <h2>Manager de Ventas</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                Operaciones
              </li>
              <li className="breadcrumb-item active">
                <strong>Manager de Ventas</strong>
              </li>
            </ol>
          </div>
        </div>
        <div className="row wrapper wrapper-content animated fadeInRight">
          {this.getSaleManager()}
        </div>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeProductOfTheOrder: (product_id) => {
      dispatch(removeProductOfTheOrderAction(product_id))
    },
    clearAllManager: () => {
      dispatch(clearAllManagerAction())
    },
    setInitialOrders: () => {
      dispatch(setInitialOrdersAction())
    },
    searchProducts: (toSearch) => {
      dispatch(searchProducts(toSearch))
    },
    addProductToTheOrder: (product) => {
      dispatch(addProductToTheOrderAction(product))
    },
    setQtyOfProductAddedOnTheOrder: (product_id, newQty) => {
      dispatch(setQtyOfProductAddedOnTheOrderAction(product_id, newQty))
    },
    setAmountReceivedAndReturn: (value) => {
      dispatch(setAmountReceivedAndReturnAction(value))
    },
    setNewActiveOrder: (order_id) => {
      dispatch(setNewActiveOrderAction(order_id))
    },
    addNewOrder: () => {
      dispatch(addNewOrderAction())
    },
    removeOrder: () => {
      dispatch(removeOrderAction())
    },
    sendOrder: () => {
      dispatch(sendOrder())
    }
  }
}

function mapStateToProps(state) {
  return {
    allOrders: state.managerReducer.allOrders,
    activeOrder: state.managerReducer.activeOrder,
    isLoaded: state.managerReducer.isLoaded
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleManager)