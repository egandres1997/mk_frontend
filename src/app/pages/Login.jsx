import React from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">TR+</h1>
                    </div>
                    <p>Login in. To see it in action.</p>
                    <form className="m-t" role="form" action="index.html">
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Username" required="" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="" />
                        </div>
                        <button type="submit" className="btn btn-primary block full-width m-b">Login</button>
                    </form>
                    <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Login)