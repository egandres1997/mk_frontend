import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenariosActions } from '../../_actions';
import { Table } from '../../_components';

class Home extends Component {
	constructor(props) {
		super(props)

        this.buildTableData = this.buildTableData.bind(this)
        this.handleClickShowScenario = this.handleClickShowScenario.bind(this)
	}

    componentDidMount() {
        this.props.dispatch(scenariosActions.getAllScenarios());
    }

    handleClickShowScenario(id, e) {
        e.preventDefault();

        this.props.dispatch(scenariosActions.redirectToDescription(id));
    }

    buildTableData(scenarios) {
        
        let rows = []
        const columns = ['Nombre','Descripcion','Brief']
        const actions = [
            {
                title: 'Editar',
                btn: 'btn btn-primary',
                action: this.handleClickShowScenario
            }
        ]

        if (scenarios.length) {
            scenarios.map((scenario) => {
                rows.push({
                    'id': scenario.id,
                    'Nombre': scenario.name,
                    'Descripcion': (scenario.description.length > 80) ? `${scenario.description.slice(0, 80)}...` : scenario.description,
                    'Brief': (scenario.brief.length > 80) ? `${scenario.brief.slice(0, 80)}...` : scenario.brief
                })
            })
        }

        return { rows, columns, actions }
    }

	render() {
        
        const { scenarios } = this.props

        const tableData = this.buildTableData(scenarios)

        let content = !scenarios.length ? 
                            'No se encontraron escenarios' :
                            <Table rows={tableData.rows} columns={tableData.columns} actions={tableData.actions}/>

		return (
            <div className="Home">
            	{content}
            </div>
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

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home }; 