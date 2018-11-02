import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions'

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			alert: {
				type: 'alert-info',
				message: 'Ingrese sus datos para acceder.'
			},
			form: {
				email: '',
				password: '',
				submitted: false
			}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		const { name, value } = e.target;

        this.setState((state) => {
        	return state.form[name] = value;
        });
	}

	handleSubmit(e) {
		e.preventDefault();

        this.setState((state) => {
        	return state.form.submitted = true;
        });

        const { email, password } = this.state.form;
        const { dispatch } = this.props;

        if (email && password) {
            dispatch(userActions.login(email, password));
        }
	}

	render() {
		const alert = Object.keys(this.props.alert).length ? 
									this.props.alert : 
									this.state.alert

		const { form } = this.state
		const { email, password, submitted } = form
		const { loggingIn } = this.props
		return (
			<div className="col-md-4 col-md-offset-4">
                <h2 className="text-center">Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                        	<span className="help-block">El email es requerido</span>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        	<span className="help-block">La contraseña es requerida</span>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
		)
	}
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 