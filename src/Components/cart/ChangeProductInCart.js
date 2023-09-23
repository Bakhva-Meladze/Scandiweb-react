import React from "react";
import CartContext from "./CartContext";
import AddProductInCart from "./AddProductInCart";



class  ChangeProductInCart extends React.Component {

    constructor(props) {
        super(props);

    }
    ChangeProductInCart = (type, key) => {
        let Object = this.context.cachedData;

        if (type === "increase") {
            let cachedData = this.context.cachedData;
            cachedData[key].length++;
            this.setState({
                cachedData: cachedData
            })
            localStorage.setItem("cartProducts", JSON.stringify(Object));
        }

        if (type === "decrease") {
            let cachedData = this.context.cachedData;
            cachedData[key].length--;
            this.setState({
                cachedData: cachedData
            })

            localStorage.setItem("cartProducts", JSON.stringify(Object));
        }

        if (this.context.cachedData[key].length === 0) {
            console.log(Object);

            Object.splice(key, 1);
            this.state.cachedData.length > 0 ? localStorage.setItem("cartProducts", JSON.stringify(Object))
                : localStorage.removeItem("cartProducts");
        }

        this.setState({
            cachedData: JSON.parse(localStorage.getItem('cartProducts')),
        })
    }


    render() {
        console.log(this.context.cachedData);

        const {
               queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
               AddProductInCart,SelectChangeCurrency,
               cachedData,listOfCartProducts,currencyKey,productsPrices} = this.context;
        const {ChangeProductInCart} =this;

        return(
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
                cachedData,listOfCartProducts,productsPrices,currencyKey,
                AddProductInCart,SelectChangeCurrency,ChangeProductInCart}}>
                {this.props.children}
            </CartContext.Provider>

        )
    }
}
ChangeProductInCart.contextType = CartContext;

export default ChangeProductInCart