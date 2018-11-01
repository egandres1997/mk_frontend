import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenariosActions } from  '../../_actions'

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
			this.props.dispatch(scenariosActions.getScenarioById(this.props.match.params.id));
		}
	}

	handleClickCreateProduct(e) {
		e.preventDefault()

		const name = e.target.elements.name.value
		const description = e.target.elements.description.value 
		const brief = e.target.elements.brief.value 

		if(!name || !description || !brief) {
			alert('Debe completar los campos')
		}

		this.props.dispatch(scenariosActions.createScenario({ name, description, brief }))

	}

	handleClickUpdateProduct(id, e) {
		e.preventDefault()

		const name = e.target.elements.name.value
		const description = e.target.elements.description.value 
		const brief = e.target.elements.brief.value 

		if(!name || !description || !brief) {
			alert('Debe completar los campos')
		}

		this.props.dispatch(scenariosActions.updateScenario(id, { name, description, brief }));
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
					{ onEdition ? 'Modificar Escenario' : 'Crear Escenario' }
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
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'description', label: 'Descripción'}}>
						<textarea 
							className="form-control" 
							name="description" 
							value={onEdition ? onEdition.description : this.state.form['description']} 
							onChange={this.handleChange}
						></textarea>
					</FormGroup>
					<FormGroup attributes={{labelCol: 'col-sm-2', controlName: 'brief', label: 'Brief'}}>
						<input 
							type="text" 
							className="form-control" 
							name="brief" 
							value={onEdition ? onEdition.brief : this.state.form['brief']} 
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
    	onEdition: state.scenarios.onEdition
    };
}

const connectedProductsForm = connect(mapStateToProps)(ProductsForm);
export { connectedProductsForm as ProductsForm }; 