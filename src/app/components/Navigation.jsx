import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router-dom';
import _ from 'lodash'

class Navigation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active: _.find(this.props.navigation.items, { nombre_ruta: this.props.location.pathname }).id
        }
    }

    componentDidMount() {
        let { menu } = this.refs;
        let sideMenu = $(menu).metisMenu()
    }

    link(module, childrens) {
        childrens = _.filter(childrens, { id_padre: module.id })
        let icon = (
            <i className={module.icono}></i> 
        )
        let name = (
            <span className="nav-label">
                {module.nombre_menu}
            </span>
        )
        let arrow = childrens.length && <span className="fa arrow"></span>
        if(!module.nombre_ruta) {
            return <a href="#">{icon}{name}{arrow}</a>
        }
        return <Link to={module.nombre_ruta}>{icon}{name}</Link>
    }

    onClick(id, route) {
        if(route) {
            this.setState({
                ...this.state,
                active: id
            })
        }
    }

    listNavigation() {
        let parents = []
        let childrens = []

        this.props.navigation.items.forEach((item) => {
            if(!item.id_padre) {
                parents.push(item)
            } else {
                childrens.push(item)
            }
        })

        let parentsAux = Array()
        let active = this.state.active

        parents.map((parent, idx1) => {

            let haveChildrenActive = false

            let childrenAux = _.filter(childrens, { id_padre: parent.id }).map((children, idx2) => {
                haveChildrenActive = this.state.active === children.id
                return (
                    <li
                        className={haveChildrenActive ? "active" : ""} 
                        key={idx2} 
                        onClick={this.onClick.bind(this, children.id, children.nombre_ruta)}
                    >
                        <Link to={children.nombre_ruta}>
                            <i className={children.icono}></i> 
                            <span className="nav-label">
                                {children.nombre_menu}
                            </span>
                        </Link>
                    </li>
                )
            })
            
            let isParentActive = this.state.active === parent.id
            parentsAux.push(
                <li 
                    className={isParentActive || haveChildrenActive ? "active" : ""} 
                    key={idx1} 
                    onClick={this.onClick.bind(this, parent.id, parent.nombre_ruta)}
                >
                    {this.link(parent, childrens)}
                    {childrenAux.length >= 1 &&
                        <ul className={`nav nav-second-level collapse ${haveChildrenActive ? "in" : ""}`}>
                            {childrenAux}
                        </ul>
                    }
                </li>
            )
        })

        return parentsAux
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element">
                                <a data-toggle="dropdown" className="dropdown-toggle">
                                <span className="clear"> 
                                    <span className="block m-t-xs"> 
                                        <strong className="font-bold">{this.props.user.name}</strong>
                                    </span> 
                                </span> 
                              </a>
                            </div>
                            <div className="logo-element">
                                TR+
                            </div>
                        </li>
                        {this.listNavigation()}
                    </ul>

            </nav>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        navigation: state.authReducer.navigation,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(Navigation)