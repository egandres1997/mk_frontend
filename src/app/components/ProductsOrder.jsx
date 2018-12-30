import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class ProductsOrder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alerts: {
                confirmRemoveProductOfTheOrder: false,
                amountReceivedValidation: false,
                confirmRemoveAllOrder: false
            }
        }

        this.setConfirmRemoveProductOfTheOrderState = this.setConfirmRemoveProductOfTheOrderState.bind(this)
        this.onChangeAmountReceived = this.onChangeAmountReceived.bind(this)
    }

    componentDidMount() {
        $('body').addClass('mini-navbar')
    }

    removeProductOfTheOrder(product_id) {
        this.props.removeProductOfTheOrder(product_id)
        this.setConfirmRemoveProductOfTheOrderState(false)
    }

    onQtyChange(product) {
    	let newQty = ReactDOM.findDOMNode(this[`qtyRef_${product.id}`]).value
    	this.props.setQtyOfProductAddedOnTheOrder(product.id, newQty)
    }

    productsAddedToTheOrder() {
        if(!this.props.products.length) {
            return (
                <React.Fragment>
		        	<div className="widget  p-lg text-center">
		                <div className="m-b-md">
		                	<FontAwesomeIcon icon={faShoppingCart} className="fa-4x" />
		                	<br/><br/>
		                    <small>No se han agregado productos para la venta</small>
		                </div>
		            </div>
                </React.Fragment>
            )
        }
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {this.props.products.map((product, key) => {
                	let qtyRefNode = `qtyRef_${product.id}`
                    return (
                        <tr key={key}>
                            <td>{product.nombre_articulo}</td>
                            <td className="text-center">
                            	<strong>$ {_.first(product.ListaPreciosDetalles).precio_de_venta}</strong>
                            </td>
                            <td className="text-center">
                            	<input
                            		min="1"
                            		className="form-control"
                            		style={{ width: '65px', margin: '0 auto' }} 
                            		type="number" 
                            		value={product.qty}
                            		key={product.id} 
                            		onChange={this.onQtyChange.bind(this, product)}
                            		onBlur={() => {
                            			if(!ReactDOM.findDOMNode(this[qtyRefNode]).value.length || !ReactDOM.findDOMNode(this[qtyRefNode]).value) {
	                            			ReactDOM.findDOMNode(this[qtyRefNode]).value = 1
	                            			this.onQtyChange(product)
                            			}
                            		}}
                            		ref={node => this[qtyRefNode] = node }
                            	/>
                            </td>
                            <td className="text-navy text-center"> 
                                <strong>$ {product.total}</strong> 
                            </td>
                            <td className="text-center">
                            	<button 
                                    className="btn btn-xs btn-outline btn-danger"
                                    onClick={() => {
			                        	this.setState({ 
							        		...this.state,
							        		itemToRemove: product.id,
							        		alerts: {
							        			...this.state.alerts,
							        			confirmRemoveProductOfTheOrder: true
							        		} 
							        	})
		                        	}}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    totalsBar() {
    	if(!this.props.totalAmountOrder) {
            return null
        }
    	return (
            <React.Fragment>
        		<table className="table table-bordered">
                    <tbody>
    	                <tr>
    	                    <td className="text-center" colSpan="2">
    	                    	<strong>
    	                    		Total: &nbsp;
    	                    		<span className="text-navy">$ {this.props.totalAmountOrder}</span>
    	                    	</strong>
    	                    </td>
    	                </tr>
    	                <tr>
    	                    <td className="text-center">
    	                    	<strong>
    	                    		Monto Recibido
    	                    	</strong>
    	                    </td>
    	                    <td className="text-center" style={{ padding: 0 }}>
    	                    	<input
    	                    		style={{ border: 0 }}
    	                    		className="form-control" 
    	                    		type="number" 
                                    ref={node => this.amountReceivedRef = node}
    	                    		value={this.props.amountReceived} 
    	                    		min={this.props.totalAmountOrder}
    	                    		onChange={this.onChangeAmountReceived}
                                    onBlur={(e) => {
                                        if(!ReactDOM.findDOMNode(this.amountReceivedRef).value.length || !ReactDOM.findDOMNode(this.amountReceivedRef).value) {
                                            ReactDOM.findDOMNode(this.amountReceivedRef).value = 0
                                            this.onChangeAmountReceived(e)
                                        }
                                    }}
    	                    	/>
    	                    </td>
    	                </tr>
    	                <tr>
    	                    <td className="text-center">
    	                    	<strong>
    	                    		Monto a Devolver
    	                    	</strong>
    	                    </td>
    	                    <td style={{ padding: '12px' }}>
                                <strong>
                                    <span className="text-navy">$ {this.props.amountToReturn}</span>
                                </strong>
                            </td>
    	                </tr>
                        {this.state.alerts.amountReceivedValidation && 
                        <tr>
                            <td className="text-danger text-center" colSpan="2">
                                El monto recibido es menor al monto de la venta
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
                <button 
                    type="button" 
                    className="btn btn-block btn-outline btn-primary"
                    onClick={this.props.sendOrder}
                >
                    Enviar Orden
                </button>
            </React.Fragment>
    	)
    }

    onChangeAmountReceived(e) {
        let value = e.target.value
        this.props.setAmountReceivedAndReturn(value)
        this.setAmountReceivedValidationState(value < this.props.totalAmountOrder)
    }

    setAmountReceivedValidationState(state) {
        this.setState({
            ...this.state,
            alerts: {
                ...this.state.alerts,
                amountReceivedValidation: state
            }
        })
    }

    setConfirmRemoveProductOfTheOrderState(state) {
    	this.setState({ 
    		...this.state,
    		alerts: {
    			...this.state.alerts,
    			confirmRemoveProductOfTheOrder: state
    		} 
    	})
    }

    setConfirmRemoveAllOrderState(state) {
        this.setState({ 
            ...this.state,
            alerts: {
                ...this.state.alerts,
                confirmRemoveAllOrder: state
            } 
        })
    }

    removeOrder() {
        this.props.removeOrder()
        this.setConfirmRemoveAllOrderState(false)
    }

    render() {
		return (
			<React.Fragment>
                <div className="ibox">
                    <div className="ibox-title">
                        <h5>Items en la orden</h5>
                        <div className="pull-right">
                            <button 
                                className="btn btn-xs btn-outline btn-danger"
                                onClick={() => this.setConfirmRemoveAllOrderState(true)}
                            >
                                Cancelar Orden
                            </button>
                        </div>
                    </div>
                    <div className="ibox-content">
                        {this.productsAddedToTheOrder()}
                        {this.totalsBar()}
                    </div>
                </div>
                <SweetAlert
			        show={this.state.alerts.confirmRemoveProductOfTheOrder}
			        title="Atención!"
			        text="Seguro que desea eliminar este producto de la orden?"
			        onConfirm={() => this.removeProductOfTheOrder(this.state.itemToRemove)}
			        showCancelButton={true}
			        onCancel={() => this.setConfirmRemoveProductOfTheOrderState(false)}
			    />
                <SweetAlert
                    show={this.state.alerts.confirmRemoveAllOrder}
                    title="Atención!"
                    text="Seguro que desea eliminar por completo esta orden?"
                    onConfirm={this.removeOrder.bind(this)}
                    showCancelButton={true}
                    onCancel={() => this.setConfirmRemoveAllOrderState(false)}
                />
            </React.Fragment>
		)
	}
}

export default ProductsOrder