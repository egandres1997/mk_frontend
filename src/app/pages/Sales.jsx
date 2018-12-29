import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faBoxOpen, faBook, faAd, faMoneyBill, faClipboardCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { removeProductOfTheOrderAction, clearAllManagerAction } from '../reducers/managerReducer'
import ProductsGrid from '../components/ProductsGrid'
import ProductsOrder from '../components/ProductsOrder'

class Sales extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        $('body').addClass('mini-navbar')
        this.props.clearAllManager()
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
                    <div className="col-lg-7">
                        <ProductsGrid products={this.props.allProductsFound} itemWidth="col-md-4"/>
                    </div>
                    <div className="col-lg-5">
                        <ProductsOrder 
                            products={this.props.productsAddedToTheOrder} 
                            totalAmountOrder={this.props.totalAmountOrder}
                            amountReceived={this.props.amountReceived}
                            amountToReturn={this.props.amountToReturn}
                        />
                    </div>
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
        }
    }
}

function mapStateToProps(state) {
    return {
        productsAddedToTheOrder: state.managerReducer.productsAddedToTheOrder,
        allProductsFound: state.managerReducer.allProductsFound,
        totalAmountOrder: state.managerReducer.totalAmountOrder,
        amountReceived: state.managerReducer.amountReceived,
        amountToReturn: state.managerReducer.amountToReturn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales)