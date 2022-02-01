import React, {Component} from "react";
import {Redirect, Routes, Route, Link, BrowserRouter as Router} from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';

import Products from './components/Products';
import {getProducts, validateUser} from "./utils/Resources";

import Context from "./Context";
import ShoppingCart from "./components/ShoppingCart";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            cart: {},
            products: []
        };
        this.routerRef = React.createRef();
    }

    componentDidMount() {
        try {
            let user = localStorage.getItem("user");
            let cart = localStorage.getItem("cart");

            const products = getProducts();
            user = user ? JSON.parse(user) : null;
            cart = cart ? JSON.parse(cart) : {};

            this.setState({user, products: products, cart});
        } catch (error) {
            console.log('Error', error);
        }
    }

    // lägg till en vara till korgen
    addToCart = cartItem => {
        let cart = this.state.cart;

        if (cart[cartItem.id]) {
            cart[cartItem.id].amount += cartItem.amount;
        } else {
            cart[cartItem.id] = cartItem;
        }
        if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
            cart[cartItem.id].amount = cart[cartItem.id].product.stock;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };

    // ta bort vara från korgen
    removeFromCart = cartItemId => {
        let cart = this.state.cart;
        delete cart[cartItemId];
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({cart});
    };

    // Rensa varukorgen
    clearCart = () => {
        let cart = {};
        localStorage.removeItem("cart");
        this.setState({cart});
    };

    // Till kassan.
    checkout = () => {
        if (!this.state.user) {
            alert("Login is required");
            this.routerRef.current.history.push("/login");
            return;
        }

        console.log("Köpta  varor:");

        const cart = this.state.cart
        console.log(cart);
        let productKeys = Object.keys(cart); // nycklar till produkter i cart

        let varor = "";
        for (let i = 0; i < productKeys.length; i++) {
            let obj = cart[productKeys[i]];
            varor += cart[obj.id].id;
            varor += " antal: ";
            varor += cart[obj.id].amount;
            varor += " Beskrivning: ";
            varor += cart[obj.id].product.descr;
            varor += "\n";
        }
        console.log(varor);
        alert(varor);
        console.log("Betalningen ok........");

        const products = this.state.products.map(p => {
            if (cart[p.name]) {
                p.stock = p.stock - cart[p.name].amount;
            }
            return p;
        });
        this.setState({products});
        this.clearCart();
    };

    checkout_old = () => {
        if (!this.state.user) {
            this.routerRef.current.history.push("/login");
            return;
        }
        this.DetailsScreen();
        const cart = this.state.cart;

        const products = this.state.products.map(p => {
            if (cart[p.name]) {
                p.stock = p.stock - cart[p.name].amount;
            }
            return p;
        });
        this.setState({products});
        this.clearCart();
        //
        // Här sker betalningen. Vi nöjer oss med att skriva till console.log
        console.log("Betalningen ok........");
    };


    login = async (email, password) => {
        const userIsValid = validateUser(email, password);

        if (userIsValid) {
            const user = {
                email,
                accessLevel: email === 'admin@example.com' ? 0 : 1
            }

            this.setState({user});
            localStorage.setItem("user", JSON.stringify(user));
            return true;
        } else {
            return false;
        }
    }

    logout = e => {
        e.preventDefault();
        this.setState({user: null});
        localStorage.removeItem("user");
        this.clearCart();
    };

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    removeFromCart: this.removeFromCart,
                    addToCart: this.addToCart,
                    clearCart: this.clearCart,
                    checkout: this.checkout,
                    login: this.login,
                    validUser:this.user
                }}
            >
                <Router ref={this.routerRef}>
                    <div className="App">
                        <nav
                            className="navbar container"
                            role="navigation"
                            aria-label="main navigation">
                            <div className={`navbar-menu ${this.state.showMenu ? "is-active" : ""}`}>

                                < Link to="/Home" className="navbar-item">
                                    Hemma
                                </Link>
                                <Link to="/produkter" className="navbar-item">
                                    Produkter
                                </Link>
                                <Link to="/varukorg" className="navbar-item">
                                    Varukorgen
                                    <span
                                        className="tag is-primary"
                                        style={{marginLeft: "5px"}}>
                                {Object.keys(this.state.cart).length}
                                    </span>
                                </Link>

                                {!this.state.user ? (
                                        <Link to="/login" className="navbar-item">
                                            Logga in
                                        </Link>
                                    ) :
                                    (
                                        <Link to="/" onClick={this.logout} className="navbar-item">
                                            Logga ut
                                        </Link>
                                    )}
                            </div>
                        </nav>
                        <Routes>
                            <Route path="/" element={<Home/>}></Route>
                            <Route path="/Home" element={<Home/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route exact path="/varukorg" element={<ShoppingCart/>}></Route>
                            <Route exact path="/produkter" element={<Products/>}></Route>
                        </Routes>
                    </div>
                </Router>
            </Context.Provider>
        );
    }
}
