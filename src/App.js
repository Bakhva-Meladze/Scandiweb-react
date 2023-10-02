import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import {Route, Redirect, BrowserRouter, Switch} from "react-router-dom";
import ProductPage from "./Components/ProductPage/ProductPage";
import Cart from "./Components/cart/Cart";
import "./Style/Style.css";
import CartProvider from "./Components/cart/CartProvider";
import Queres from "./querys/Queres";
import AddProductInCart from "./Components/cart/AddProductInCart";
import ChangeProductInCart from "./Components/cart/ChangeProductInCart";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Queres>
                    <AddProductInCart>
                        <ChangeProductInCart>
                            <CartProvider>
                                <BrowserRouter>
                                    <Header/>
                                    <Switch>
                                        <Route exact path="/">
                                            <Redirect to="/category/all"/>
                                        </Route>
                                        <Route path="/category/:item">
                                            <CategoryPage/>
                                        </Route>
                                        <Route path="/product/:productId">
                                            <ProductPage/>
                                        </Route>
                                        <Route path="/Cart">
                                            <Cart/>
                                        </Route>
                                    </Switch>
                                </BrowserRouter>
                            </CartProvider>
                        </ChangeProductInCart>
                    </AddProductInCart>
                </Queres>
            </div>
        )
    }
}

export default App