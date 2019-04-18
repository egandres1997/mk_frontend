import React from 'react'
import { connect } from 'react-redux'
import { initialInputState } from '../utils/utils'
import { login, loadNavigationData } from '../reducers/authReducer'
import { Placeholder } from '../utils/FormControl'
import { setAction } from '../reducers/actionReducer'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: initialInputState({ name: 'email', required: true, placeholder: 'Email', type: 'email' }),
            password: initialInputState({ name: 'password', required: true, placeholder: 'Contraseña', type: 'password' })
        }

        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.getAlert = this.getAlert.bind(this)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    componentDidMount() {
        this.props.setAction(false)
    }

    onClick (e) {
        e.preventDefault()
        let emailValue = this.state.email.value
        let passwordValue = this.state.password.value

        if (emailValue === "" || passwordValue === "") {
            this.props.setAction(true, 422, "Email y Password necesarios.")
        } else {
            this.props.login(emailValue, passwordValue)
            this.props.loadNavigationData()
        }
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

    getAlert() {
        if (this.props.action.shouldItBeSeen) {
            return (
                <div 
                    className={"alert alert-" + (this.props.action.actionStatus === 422 ? 'danger' : 'success')}
                >
                {this.props.action.actionStatus === 422
                    ? (<React.Fragment><strong>Error: </strong> {this.props.action.actionMessage}</React.Fragment>)
                    : (<React.Fragment><strong>Éxito: </strong> {this.props.action.actionMessage}</React.Fragment>)
                }
                </div>
            )
        }
        return null
    }

    render() {
        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">TR+</h1>
                    </div>
                    <form className="m-t" role="form">
                        {this.getAlert()}
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
        },
        loadNavigationData: () => {
            dispatch(loadNavigationData())
        },
        setAction: (shouldItBeSeen, actionStatus, actionMessage) => {
            dispatch(setAction(shouldItBeSeen, actionStatus, actionMessage))
        }
    }
}

function mapStateToProps(state) {
    return {
        action: state.actionReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)