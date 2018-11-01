import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsActions } from  '../../_actions';
import { history } from '../../_helpers';

import { Table } from '../../_components';

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.handleClickEditProduct = this.handleClickEditProduct.bind(this)
		this.handleClickDeleteProduct = this.handleClickDeleteProduct.bind(this)
	}

	componentDidMount() {
		console.log(this.props)
		this.props.dispatch(productsActions.getAllByScenario(this.props.match.params.id))
	}

	handleClickEditProduct(id, e) {
		
	}

	handleClickDeleteProduct(id, e) {
		
	}

	buildTableData(products) {
		
		let rows = []
		const columns = ['Nombre','Precio', 'Ganancias', 'Vendidos']
		const actions = [
			{
				title: 'Editar',
				btn: 'btn btn-primary',
				action: this.handleClickEditProduct
			},
			{
				title: 'Eliminar',
				btn: 'btn btn-danger',
				action: this.handleClickDeleteProduct
			}
		]

		return { rows, columns, actions }
	}

	render() {
		const { products } = this.props

		const alert = Object.keys(this.props.alert).length ? this.props.alert : null; 

		const tableData = this.buildTableData(products)

		return (
			<div>
				{alert &&
					<div className={`alert ${alert.type}`}>{alert.message}</div>
				}
	        	<Table rows={tableData.rows} columns={tableData.columns} actions={tableData.actions}/>
	        </div>
        )
	}
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        products: state.products.rows || [],
        alert
    };
}

const connectedProductsList = connect(mapStateToProps)(ProductsList);
export { connectedProductsList as ProductsList }; 