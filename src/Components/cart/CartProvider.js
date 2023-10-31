import React, {Component} from "react";
import CartContext from "./CartContext";

class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
        }
    }

    SelectCurrency = (data = 0) => {
        let array = [];

        this.context.cachedData?.map((value, key) => (
            array.push(value.prices[data])

        ));

        localStorage.setItem("currencyKey", JSON.stringify(data));

        this.setState({
            currencyKey: data,
            productsPrices: array[data]
        });
    }

    QuantityOfProducts = () => {
        let sumResult = 0;
        this.context.cachedData ? this.context.cachedData.map((value) => (
            sumResult += value.length
        )) : sumResult = 0;

        return sumResult;
    }

    render() {
        const {
            queryOfProduct, queryOfCategory, currencyPriceQuery, changeUrl, AddProductInCart, ChangeProductInCart,
            cachedData, testData, productsPrices,
        } = this.context;
        const {openOverlay, currencyKey} = this.state;
        const {SelectCurrency, QuantityOfProducts, ChangeOverlay} = this;
        return (
            <CartContext.Provider value={{
                cachedData, productsPrices, openOverlay, testData,
                SelectCurrency, QuantityOfProducts, ChangeOverlay,
                AddProductInCart, queryOfProduct, queryOfCategory, currencyPriceQuery, changeUrl,
                ChangeProductInCart, currencyKey
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

CartProvider.contextType = CartContext;
export default CartProvider;