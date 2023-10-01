import React from "react";
import CartContext from "./CartContext";
import AddProductInCart from "./AddProductInCart";
import {object} from "prop-types";



class  ChangeProductInCart extends React.Component {

    constructor(props) {
        super(props);
    }
    ChangeProductInCart = (type, key) => {
        let Object = this.context.cachedData;

        let cachedData = this.context.cachedData;
        cachedData[key].length += (type === "increase" ? 1 : -1);

        if (this.context.cachedData[key].length === 0) {
            console.log(Object);

            Object.splice(key, 1);
            localStorage.setItem("cartProducts", JSON.stringify(Object));
            // localStorage.removeItem("cartProducts");
        }

        this.setState({
            cachedData: cachedData
        })
        localStorage.setItem("cartProducts", JSON.stringify(Object.length < 1 ? null : Object));

      /*  if (type === "increase") {
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
        }*/

/*        if (this.context.cachedData[key].length === 0) {
            console.log(Object);

            Object.splice(key, 1);
            localStorage.setItem("cartProducts", JSON.stringify(Object));
            // localStorage.removeItem("cartProducts");
        }*/

        // this.setState({
        //     cachedData: JSON.parse(localStorage.getItem('cartProducts')),
        // })
    }




    render() {
        const {
               queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
               AddProductInCart,SelectChangeCurrency,
               cachedData,currencyKey,productsPrices} = this.context;
        const {ChangeProductInCart} =this;

        return(
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
                cachedData,productsPrices,currencyKey,
                AddProductInCart,SelectChangeCurrency,ChangeProductInCart}}>
                {this.props.children}
            </CartContext.Provider>

        )
    }
}
ChangeProductInCart.contextType = CartContext;

export default ChangeProductInCart