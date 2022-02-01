import React from "react";

const Product = props => {
    const { product } = props;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-content">
                        <figure className="image is-64x64">
                            <img
                                src={product.src}
                                alt={product.desc}
                            />
                        </figure>

                        <b style={{ textTransform: "capitalize" }}>
                            {product.name}{" "}
                            <span className="tag is-primary">${product.price}</span>
                        </b>

                        <div>{product.desc}</div>

                        {product.stock > 0 ? (
                            <small>{product.stock + " Available"}</small>
                        ) : (
                            <small className="has-text-danger">Out Of Stock</small>
                        )}

                        <div className="is-clearfix">
                            <button
                                className="button is-small is-outlined is-primary   is-pulled-right"
                                onClick={() =>
                                    props.addToCart({
                                        id: product.name,
                                        product,
                                        amount: 1
                                    })
                                }>
                                Lägg till varukorgen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
