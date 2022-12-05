import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import ProductPage from './Components/ProductPage/ProductPage'
import Cart from "./Components/cart/Cart";
import "./style.css"

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="App">
                    <Header />
                <BrowserRouter>
                    <Route path="/category/:items">
                        <CategoryPage />
                    </Route>
                    <Route path="/Product/:id">
                    <ProductPage />
                    </Route>
                    <Route path="/Cart">
                        <Cart />
                    </Route>
                </BrowserRouter>
            </div>
        )
    }


}