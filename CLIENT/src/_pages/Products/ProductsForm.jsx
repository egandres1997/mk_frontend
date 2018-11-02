import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsActions } from  '../../_actions'

import { Form, FormGroup, Button } from '../../_components'

import { history } from '../../_helpers';

class ProductsForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			form: {
				name: '',
				img_route: '',
				price: '',
				earnings: '',
				solds: ''
			}
		}

		this.handleClickCreateProduct = this.handleClickCreateProduct.bind(this)
		this.handleClickUpdateProduct = this.handleClickUpdateProduct.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		const { onEdition } = this.props

		if (this.props.match.path.match('/products/update')) {
			this.props.dispatch(productsActions.getProductById(this.props.match.params.id));
		}
	}

	handleClickCreateProduct(e) {
		e.preventDefault()


		const name = e.target.elements.name.value
		const price = e.target.elements.price.value 
		const earnings = e.target.elements.earnings.value 
		const solds = e.target.elements.solds.value
		const img_route = e.target.elements.img_route.files[0]

		/*if(!name || !price || !earnings || !solds) {
			alert('Debe completar los campos')
		}*/

		this.props.dispatch(productsActions.createProduct(this.props.match.params.id_scenario, { name, price, earnings, solds, img_route }))

	}

	handleClickUpdateProduct(id, e) {
		e.preventDefault()

		const name = e.target.elements.name.value
		const price = e.target.elements.price.value 
		const earnings = e.target.elements.earnings.value 
		const solds = e.target.elements.solds.value 
		const img_route = e.target.elements.img_route.value 

		if(!name || !price || !earnings || !solds) {
			alert('Debe completar los campos')
		}

		this.props.dispatch(productsActions.updateProduct(id, { name, price, earnings, solds }));
	}

	handleChange(e) {
		const { name, value } = e.target;

        this.setState((state) => {
        	return state.form[name] = value;
        });

        if (this.props.onEdition)
        	this.props.onEdition[name] = value;
	}

	render() {
		const { onEdition } = this.props

		return (
			<div>
				<div className="alert alert-info">
					{ onEdition ? 'Modificar Producto' : 'Crear Producto' }
				</div>
				<Form 
					submittedAction={onEdition ? 
										this.handleClickUpdateProduct.bind(this, this.props.match.params.id) : 
										this.handleClickCreateProduct}
				>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'name', label: 'Nombre'}}>
						<input 
							type="text" 
							className="form-control" 
							name="name" 
							value={onEdition ? onEdition.name : this.state.form['name']} 
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'price', label: 'Precio'}}>
						<input 
							type="number"
							className="form-control"
							name="price"
							value={onEdition ? onEdition.price : this.state.form['price']} 
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'earnings', label: 'Ganancias'}}>
						<input 
							type="number"
							className="form-control"
							name="earnings"
							value={onEdition ? onEdition.earnings : this.state.form['earnings']} 
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'solds', label: 'Vendidos'}}>
						<input 
							type="number"
							className="form-control"
							name="solds"
							value={onEdition ? onEdition.solds : this.state.form['solds']} 
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'img_route', label: 'Imagen'}}>
						<input 
							type="file"
							className="form-control"
							name="img_route"
							onChange={this.handleChange}
						/>
					</FormGroup>
					<div className="col-sm-12">
						<Button 
							btnClass="btn btn-primary pull-right" 
							title={ onEdition ? 'Modificar' : 'Crear' }
						/>
					</div>
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
    	onEdition: state.products.onEdition
    };
}

const connectedProductsForm = connect(mapStateToProps)(ProductsForm);
export { connectedProductsForm as ProductsForm }; 