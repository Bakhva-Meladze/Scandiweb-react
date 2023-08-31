import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import ProductPage from "./Components/ProductPage/ProductPage";
import Cart from "./Components/cart/Cart";
import "./Style/Style.css";
import ProductCard from "./Components/CategoryPage/ProductCard";
import Overlay from "./Components/Header/Overlay";
import CartProvider from "./Components/cart/CartProvider";
import ProductQueryClass from "./querys/ProductQueryClass";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <CartProvider>
                        <Header>
                            <Overlay>
                                <Cart/>
                            </Overlay>
                        </Header>
                        <BrowserRouter>
                            <Route exact path="/">
                                <Redirect to="category/all"/>
                            </Route>
                            <Route path="/category/:items">
                                <CategoryPage>
                                    <ProductCard/>
                                </CategoryPage>
                            </Route>
                            <Route path="/Product/:id">
                                <ProductPage/>
                            </Route>
                            <Route path="/Cart">
                                <Cart/>
                            </Route>
                        </BrowserRouter>
                </CartProvider>
            </div>
        )
    }
}