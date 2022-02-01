import React from "react";
import ShoppingCartItem from "./ShoppingCartItem";

const Checkout = props => {
    const {cart: shoppingCart} = props.context;
    const shoppingCartKeys = Object.keys(shoppingCart || {});
    return (
        <>
            <div className="hero-body container">
                <h4 className="title">Sista steget: Betalning Vi tar bara emot Swisch :-) </h4>
            </div>

            <br/>
            <div className="container">
                {shoppingCartKeys.length ? (
                    <div className="column columns is-multiline">
                        {shoppingCartKeys.map(key => (
                            <ShoppingCartItem
                                cartKey={key}
                                key={key}
                                cartItem={shoppingCart[key]}
                                removeFromCart={props.context.removeFromCart}/>
                        ))}
                        <div className="column is-12 is-clearfix">
                            <br/>
                            <div className="is-pulled-right">
                                <button
                                    onClick={props.context.clearCart}
                                    className="button is-warning ">
                                    Töm varukorgen
                                </button>
                                {" "}
                                <button
                                    className="button is-success"
                                    onClick={props.context.checkout}>
                                    Till kassan
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="column">
                        <div className="title has-text-grey-light">Varukorgen är tom. Inget att betala</div>
                    </div>
                )}
            </div>
        </>
    );
};
export default Checkout;
