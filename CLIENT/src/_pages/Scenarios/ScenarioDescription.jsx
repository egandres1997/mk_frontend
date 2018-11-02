import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scenariosActions } from  '../../_actions'

import { ProductCard } from '../../_components'

import { history } from '../../_helpers';

class ScenarioDescription extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.dispatch(scenariosActions.showDescription(this.props.match.params.id));
	}

	render() {

		const { scenario, products } = this.props

		return (
			<div className="ScenarioDescription">
				<div className="jumbotron text-center">
				    <h1>{ scenario.name }</h1> 
				    <p>{ scenario.description }</p>
				</div>
				<hr/>
				<h2>Brief</h2>
				<hr/>
				<p>{ scenario.brief }</p>
				<hr/>
				<h2>Productos</h2>
				<hr/>
				<div className="row">
					{
						products.map((product, index) => {
							return (
								<ProductCard product={product} key={index} />
							)
						})
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
    	scenario: state.scenarios.description || {},
    	products: state.products.rows || []
    };
}

const connectedScenarioDescription = connect(mapStateToProps)(ScenarioDescription);
export { connectedScenarioDescription as ScenarioDescription }; 