import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenariosActions } from  '../../_actions';
import { history } from '../../_helpers';

import { Table, Button } from '../../_components';

class ScenariosList extends Component {
	constructor(props) {
		super(props)

		this.handleClickEditScenario = this.handleClickEditScenario.bind(this)
		this.handleClickDeleteScenario = this.handleClickDeleteScenario.bind(this)
		this.handleClickProductsScenario = this.handleClickProductsScenario.bind(this)
		this.handleClickCreateScenario = this.handleClickCreateScenario.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(scenariosActions.getAllScenarios());
	}

	handleClickEditScenario(id, e) {
		this.props.dispatch(scenariosActions.editScenario(id))
	}

	handleClickDeleteScenario(id, e) {
		this.props.dispatch(scenariosActions.deleteScenario(id))
	}

	handleClickProductsScenario(id, e) {
		this.props.dispatch(scenariosActions.redirectToProducts(id));
	}

	handleClickCreateScenario() {
		this.props.dispatch(scenariosActions.redirectToCreateForm());	
	}

	buildTableData(scenarios) {
		
		let rows = []
		const columns = ['Nombre','Brief']
		const actions = [
			{
				title: 'Editar',
				btn: 'btn btn-primary',
				action: this.handleClickEditScenario
			},
			{
				title: 'Productos',
				btn: 'btn btn-warning',
				action: this.handleClickProductsScenario
			},
			{
				title: 'Eliminar',
				btn: 'btn btn-danger',
				action: this.handleClickDeleteScenario
			}
		]

		if (scenarios.length) {
			scenarios.map((scenario) => {
				rows.push({
					'id': scenario.id,
					'Nombre': scenario.name,
					'Brief': (scenario.brief.length > 80) ? `${scenario.brief.slice(0, 80)}...` : scenario.brief
				})
			})
		}

		return { rows, columns, actions }
	}

	render() {
		const { scenarios } = this.props

		const alert = Object.keys(this.props.alert).length ? this.props.alert : null; 

		const tableData = this.buildTableData(scenarios)

		let content = !scenarios.length ? 
							'No se encontraron escenarios' :
							<Table rows={tableData.rows} columns={tableData.columns} actions={tableData.actions}/>

		return (
			<div>
	        	{content}
	        	<Button 
					btnClass="btn btn-info pull-right" 
					title="Crear Escenario"
					action={this.handleClickCreateScenario}
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
        scenarios: state.scenarios.rows || [],
        alert
    };
}

const connectedScenariosList = connect(mapStateToProps)(ScenariosList);
export { connectedScenariosList as ScenariosList }; 