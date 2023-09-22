import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Redirect, BrowserRouter, Switch} from "react-router-dom";
import ProductPage from "./Components/ProductPage/ProductPage";
import Cart from "./Components/cart/Cart";
import "./Style/Style.css";
import ProductCard from "./Components/CategoryPage/ProductCard";
import Overlay from "./Components/Header/overlay/Overlay";
import CartProvider from "./Components/cart/CartProvider";
import Queres from "./querys/Queres";
import FetchData from "./FetchData";
import * as PropTypes from "prop-types";
import AddProductInCart from "./Components/cart/AddProductInCart";



class App extends React.Component {
    render() {
        return (
                <div className="App">
                    <Queres>
                        <AddProductInCart>
                            <CartProvider>
                                <BrowserRouter>
                                    <Header />
                                    <Switch>
                                        <Route path="/category/:item">
                                            <CategoryPage />
                                        </Route>
                                        <Route path="/product/:productId">
                                            <ProductPage />
                                        </Route>
                                        <Route path="/Cart">
                                            <Cart/>
                                        </Route>
                                    </Switch>
                                </BrowserRouter>
                            </CartProvider>
                        </AddProductInCart>
                    </Queres>
                </div>
        )
    }
}
export default App