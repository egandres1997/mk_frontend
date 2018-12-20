import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { initialInputState } from '../utils/utils'
import { login } from '../reducers/authReducer'
import { Placeholder } from '../components/FormControl'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: initialInputState({ name: 'email', required: true, placeholder: 'Email', type: 'email' }),
            password: initialInputState({ name: 'password', required: true, placeholder: 'Contraseña', type: 'password' })
        }

        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    onClick (e) {
        e.preventDefault()
        let emailValue = this.state.email.value
        let passwordValue = this.state.password.value
        this.props.login(emailValue, passwordValue)
    }

    onChange (e) {
        this.setState({
            ...this.state,
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">TR+</h1>
                    </div>
                    <form className="m-t" role="form">
                        <Placeholder
                            {...this.state.email}
                            ref={this.emailRef}
                            onChange={this.onChange}
                        />
                        <Placeholder
                            {...this.state.password}
                            ref={this.passwordRef} 
                            onChange={this.onChange}
                        />
                        <button type="submit" className="btn btn-primary block full-width m-b" onClick={this.onClick}>Entrar</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => {
            dispatch(login(email, password))
        }
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)