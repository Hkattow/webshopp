import React from "react";
import Product from "./Product";
import withContext from "../withContext";


const Products = props => {
    const {products} = props.context;

    return (
        <>
            <div className="hero-body container">
                <h4 className="title">Vårt sortiment</h4>
            </div>
            <div className="container">
                <div className="column columns is-multiline">
                    {products && products.length ? (
                        products.map((product, index) => (
                            <Product
                                product={product}
                                key={index}
                                addToCart={props.context.addToCart}/>
                        ))
                    ) : (
                        <div className="column">
                          <span className="title has-text-grey-light">
                            OBS We have no products available :-(!
                          </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default withContext(Products);
