import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsActions } from  '../../_actions';
import { history } from '../../_helpers';
import { Table, Button } from '../../_components';

class ProductsList extends Component {
	constructor(props) {
		super(props)

		this.handleClickEditProduct = this.handleClickEditProduct.bind(this)
		this.handleClickDeleteProduct = this.handleClickDeleteProduct.bind(this)
		this.handleClickCreateProduct = this.handleClickCreateProduct.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(productsActions.getAllByScenario(this.props.match.params.id))
	}

	handleClickEditProduct(id, e) {
		this.props.dispatch(productsActions.editProduct(id))
	}

	handleClickDeleteProduct(id, e) {
		this.props.dispatch(productsActions.deleteProduct(id))
	}

	handleClickCreateProduct() {
		this.props.dispatch(productsActions.redirectToCreateForm(this.props.match.params.id))
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

		if (products.length) {
			products.map((product) => {
				rows.push({
					'id': product.id,
					'Nombre': product.name,
					'Precio': product.price,
					'Ganancias': product.earnings,
					'Vendidos': product.solds
				})
			})
		}

		return { rows, columns, actions }
	}

	render() {
		const { products } = this.props

		const alert = Object.keys(this.props.alert).length ? this.props.alert : null; 

		const tableData = this.buildTableData(products)

		let content = !products.length ? 
							'No se encontraron productos relacionados a este escenario' :
							<Table rows={tableData.rows} columns={tableData.columns} actions={tableData.actions}/>			

		return (
			<div className="ProductsList">
				{alert &&
					<div className={`alert ${alert.type}`}>{alert.message}</div>
				}
	        	{ content }
	        	<Button 
					btnClass="btn btn-info pull-right" 
					title="Crear Producto"
					action={this.handleClickCreateProduct}
				/>
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