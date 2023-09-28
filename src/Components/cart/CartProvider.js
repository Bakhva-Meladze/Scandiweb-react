import React, {Component} from "react";
import CartContext from "./CartContext";


class CartProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pricesAttributes: [],
            currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
            addCategory: window.location.pathname.slice(10, window.location.href.length),
            openOverlay: false

        }
    }

    ChangeOverlay =(e) =>{
        this.setState({
            openOverlay: !this.state.openOverlay
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
         this.context.SelectChangeCurrency(data,array);
    }

    QuantityOfProducts = () => {
        let sumResult = 0;
        this.context.cachedData?this.context.cachedData.map((value) => (
            sumResult += value.length
        )):sumResult =0;

        return sumResult;
    }

    selectCategoryType =(data) =>{
        this.setState({
            addCategory:data
        })
    }

    render() {
        const { queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,AddProductInCart,ChangeProductInCart,
                cachedData,testData,currencyKey,productsPrices} = this.context;
        const { pricesAttributes,addCategory,openOverlay} = this.state;
        const { SelectCurrency, QuantityOfProducts, selectCategoryType,ChangeOverlay} = this;
        return (
            <CartContext.Provider value={{
                cachedData, productsPrices, pricesAttributes, currencyKey,addCategory,openOverlay,testData,
                SelectCurrency,QuantityOfProducts,selectCategoryType,ChangeOverlay,
                AddProductInCart,queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,ChangeProductInCart
            }}>
             {this.props.children}
            </CartContext.Provider>
        );
    }
}
CartProvider.contextType = CartContext;

export default CartProvider;