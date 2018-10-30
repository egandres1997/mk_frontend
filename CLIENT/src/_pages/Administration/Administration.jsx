import React, { Component } from 'react';
import { connect } from 'react-redux';
import { administrationActions } from  '../../_actions'

import { Table } from '../../_components'

class Administration extends Component {
	constructor(props) {
		super(props)

		this.handleClickEditScenario = this.handleClickEditScenario.bind(this)
		this.handleClickDeleteScenario = this.handleClickDeleteScenario.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(administrationActions.getAllScenarios());
	}

	handleClickEditScenario(id, e) {
		console.log(id)
	}

	handleClickDeleteScenario(id, e) {
		this.props.dispatch(administrationActions.deleteScenario(id))
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

		const tableData = this.buildTableData(scenarios)

		return (
	        <Table rows={tableData.rows} columns={tableData.columns} actions={tableData.actions}/>
        )
	}
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        scenarios: state.scenarios.rows || []
    };
}

const connectedAdministration = connect(mapStateToProps)(Administration);
export { connectedAdministration as Administration }; 