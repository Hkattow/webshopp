import React from "react";

const ShoppingCartItem = props => {
    const { cartItem: shoppingCartItem, cartKey: shoppingCartKey } = props;
    const { product, amount } = shoppingCartItem;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-96x96">
                            <img src={product.src} alt={product.desc}/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <b style={{ textTransform: "capitalize" }}>
                            {product.name}{" "}
                            <span className="tag is-primary">${product.price}</span>
                        </b>
                        <div>{product.desc}</div>
                        <small>{`${amount} in cart`}</small>
                    </div>
                    <div className="media-right" onClick={() => props.removeFromCart(shoppingCartKey)}>
                        <span className="delete is-large"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartItem;
