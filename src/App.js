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

class App extends React.Component {
    render() {
        console.log("hii");
        return (
            <div className="App">

                <Queres>
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
                                    {/*<Route path="/category/:items">
                                    <CategoryPage>
                                        <ProductCard/>
                                    </CategoryPage>
                                </Route>
                                <Route path="/Product/:id">
                                    <ProductPage/>
                                </Route>
                                <Route path="/Cart">
                                    <Cart/>
                                </Route>*/}
                            </BrowserRouter>
                        </CartProvider>
                </Queres>
            </div>
        )
    }
}
export default App