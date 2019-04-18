import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faList, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import Masonry from 'react-masonry-component'

class ProductsGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modeActive: 'list',
            inputSearchProducts: '',
            activeOrderId: this.props.activeOrderId
        }

        this.searchProducts = this.searchProducts.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if(props.activeOrderId !== state.activeOrderId) {
            return {
                inputSearchProducts: "",
                activeOrderId: props.activeOrderId
            }
        }
        return state
    }

    productsGrid() {
        if(!this.props.products.length) {
            return (
                <React.Fragment>
                    <div className="widget  p-lg text-center">
                        <div className="m-b-md">
                            <FontAwesomeIcon icon={faSearch} className="fa-4x" />
                            <br/><br/>
                            <small>No se han encontrado productos</small>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        let products = this.props.products.map((product, key) => {
            return (
                <div className={this.props.itemWidth} key={key}>
                    <div className="ibox">
                        <div className="ibox-content product-box">
                            <div className="product-imitation">
                                [ INFO ]
                            </div>
                            <div className="product-desc">
                                <span className="product-price">
                                    $ {_.first(product.ListaPreciosDetalles).precio_de_venta}
                                </span>
                                {product.codigo_barra && 
                                    <small className="text-muted">{product.codigo_barra}</small>
                                }
                                <span className="product-name">{product.nombre_articulo}</span>
                                <div className="m-t text-righ">
                                    <button 
                                        className="btn btn-xs btn-outline btn-warning"
                                        onClick={this.addProductToTheOrder.bind(this, product)}
                                    >
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="row">
                <Masonry
                    className={'ProductsGrid'}
                    elementType={'div'}
                    options={{ transitionDuration: 0 }}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >
                    {products}
                </Masonry>
            </div>
        )
    }

    productsList() {
        if(!this.props.products.length) {
            return (
                <React.Fragment>
                    <div className="widget  p-lg text-center">
                        <div className="m-b-md">
                            <FontAwesomeIcon icon={faSearch} className="fa-4x" />
                            <br/><br/>
                            <small>No se han encontrado productos</small>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Añadir</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map((product, key) => {
                        return (
                            <tr key={key}>
                                <td>{product.nombre_articulo}</td>
                                <td className="text-navy text-center">
                                    <strong>$ {_.first(product.ListaPreciosDetalles).precio_de_venta}</strong>
                                </td>
                                <td className="text-center">
                                    <button 
                                        className="btn btn-xs btn-outline btn-warning"
                                        onClick={this.addProductToTheOrder.bind(this, product)}
                                    >
                                        Añadir
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    addProductToTheOrder(product) {
        this.props.addProductToTheOrder(product)
    }

    products() {
        if(this.state.modeActive === "list") {}
            switch (this.state.modeActive) {
                case "list":
                    return this.productsList()
                case "grid":
                    return this.productsGrid()
            }
    }

    setMode(mode) {
        this.setState({
            ...this.state,
            modeActive: mode
        })
    }

    searchProducts(e) {
        e.preventDefault()
        this.props.searchProducts(this.state.inputSearchProducts)
    }

    onChangeSearchProducts(e) {
        this.setState({
            ...this.state,
            inputSearchProducts: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="ibox">
                    <div className="ibox-title" style={{ paddingTop: '6px' }}>
                        <div className="row">
                            <div className="col-sm-6 col-xs-5">
                                {this.props.products.length >= 1 &&
                                <div className="btn-group">
                                    <button 
                                        className={`btn ${this.state.modeActive === "list" ? '' : 'btn-outline'} btn-primary`} 
                                        onClick={this.setMode.bind(this, 'list')}
                                    >
                                        <FontAwesomeIcon icon={faList}/>
                                    </button>
                                    <button 
                                        className={`btn ${this.state.modeActive === "grid" ? '' : 'btn-outline'} btn-success`} 
                                        onClick={this.setMode.bind(this, 'grid')}
                                    >
                                        <FontAwesomeIcon icon={faTh}/>
                                    </button>
                                </div>
                                }
                            </div>
                            <div className="col-sm-6 col-xs-7">
                                <form onSubmit={this.searchProducts}>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Buscar producto..."
                                            onChange={this.onChangeSearchProducts.bind(this)}
                                            value={this.state.inputSearchProducts}
                                        /> 
                                        <span className="input-group-btn"> 
                                            <button type="submit" className="btn btn-primary">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="ibox-content">
                        {this.products()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductsGrid