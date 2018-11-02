import React from 'react'
import path from 'path'

export const ProductCard = ({ product }) => {
	return (
	  	<div className="item col-xs-2 col-lg-3">
            <div className="thumbnail">
                <img className="group list-group-image" src={product.img_route ? `http://localhost:3006/api/v1/products/image/${product.id}` : 'http://placehold.it/400x250/000/fff'} alt="" />
                <div className="caption">
                	<br />
                    <h3 className="group inner list-group-item-heading text-center">
                    	{product.name}
                    </h3>
                    <br />
                    <ul className="list-group">
					  	<li className="list-group-item">
							<div className="row">
								<div className="col-xs-6">
									<b>Precio</b>
								</div>
								<div className="col-xs-6">
									{ product.price } $
								</div>
							</div>
					  	</li>
					  	<li className="list-group-item">
							<div className="row">
								<div className="col-xs-6">
									<b>Margen de ganancia</b>
								</div>
								<div className="col-xs-6">
									{ product.earnings } $
								</div>
							</div>
					  	</li>
					  	<li className="list-group-item">
							<div className="row">
								<div className="col-xs-6">
									<b>Vendidos</b>
								</div>
								<div className="col-xs-6">
									{ product.solds }
								</div>
							</div>
					  	</li>
					  	<li className="list-group-item">
							<div className="row">
								<div className="col-xs-6">
									<b>Ingresos</b>
								</div>
								<div className="col-xs-6">
									{ product.solds * product.price } $
								</div>
							</div>
					  	</li>
					  	<li className="list-group-item">
							<div className="row">
								<div className="col-xs-6">
									<b>Ganancias</b>
								</div>
								<div className="col-xs-6">
									{ product.solds * product.earnings } $
								</div>
							</div>
					  	</li>
					</ul>
                </div>
            </div>
        </div>
	)
}