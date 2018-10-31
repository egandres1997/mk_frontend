import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenariosActions } from  '../../_actions'

import { Table } from '../../_components'

import { history } from '../../_helpers';

class ScenarioForm extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { onEdition } = this.props

		if (this.props.match.path.match('/scenarios/update')) {
			this.props.dispatch(scenariosActions.getScenarioById(this.props.match.params.id));
		}
	}

	render() {
		const { onEdition } = this.props

		return (
			<div>
				<div className="alert alert-info">
					{ onEdition ? 'Modificar Escenario' : 'Crear Escenario' }
				</div>
				<form className="form-horizontal" action="">
				  	<div className="form-group">
				    	<label className="control-label col-sm-2" htmlFor="name">Nombre:</label>
				    	<div className="col-sm-10">
				      		<input type="text" className="form-control" name="name" value={onEdition ? onEdition.name : ''} />
				    	</div>
				  	</div>
				  	<div className="form-group">
				    	<label className="control-label col-sm-2" htmlFor="description">Descripción:</label>
				    	<div className="col-sm-10">
				    		<textarea className="form-control" name="description" value={onEdition ? onEdition.description : ''}></textarea>
				    	</div>
				  	</div>
				  	<div className="form-group">
				    	<label className="control-label col-sm-2" htmlFor="brief">Brief:</label>
				    	<div className="col-sm-10">
				      		<input type="text" className="form-control" name="brief" value={onEdition ? onEdition.brief : ''}/>
				    	</div>
				  	</div>
				  	<div className="form-group">
				  		<div className="col-sm-12">
				    		<button className="btn btn-primary pull-right" data-id={onEdition ? `${onEdition.id}` : null}>
				    			{ onEdition ? 'Modificar' : 'Crear' }
				    		</button>
				    	</div>
				  	</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
    	onEdition: state.scenarios.onEdition
    };
}

const connectedScenarioForm = connect(mapStateToProps)(ScenarioForm);
export { connectedScenarioForm as ScenarioForm }; 