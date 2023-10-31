import React, {Component} from "react";
import CartContext from "./CartContext";

class AddProductInCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedData: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts'))
                : null,
            currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
            productsPrices: [],
        }
    }

    UpdateCurrency = (data, array) => {
        this.setState({
            currencyKey: data,
            productsPrices: array
        })
    }

    AddProductInCart = (product, choseItemID = false, length = 1) => {
        const productData = {
            id: product.id,
            choseItemID,
            length: length,
            gallery: product.gallery,
            prices: product.prices,
            items: product.attributes,
            brand: product.brand,
            name: product.name,
        }

        if (JSON.parse(localStorage.getItem("cartProducts"))) {
            let cachedProducts = JSON.parse(localStorage.getItem("cartProducts"));
            let newProduct = true;

            cachedProducts?.forEach((cachedProduct, key) => {
                if (product.id === cachedProduct.id) {
                    if (JSON.stringify(choseItemID) === JSON.stringify(cachedProduct.choseItemID)) {
                        cachedProducts[key].length += 1;
                        newProduct = false;

                        this.setState({
                            cachedData: cachedProducts
                        });

                        localStorage.setItem("cartProducts", JSON.stringify(cachedProducts));
                    }
                }
            });

            if (newProduct) {
                cachedProducts.push(productData);
                localStorage.setItem("cartProducts", JSON.stringify(cachedProducts))
                this.setState({
                    cachedData: cachedProducts
                })
            }
        } else {
            localStorage.setItem("cartProducts", JSON.stringify([productData]));
            this.setState({
                cachedData: [productData]
            })
        }
    }

    ChangeProductInCart = (type, key) => {
        let cachedCartData = this.state?.cachedData;
        cachedCartData[key].length += (type === "increase" ? 1 : -1);

        if (this.state.cachedData[key].length === 0) {
            cachedCartData.splice(key, 1);
            localStorage.setItem("cartProducts", JSON.stringify(cachedCartData));
        }

        this.setState({
            cachedData: cachedCartData
        })
        localStorage.setItem("cartProducts", JSON.stringify(cachedCartData.length < 1 ? null : cachedCartData));
    }

    render() {
        const {queryOfProduct, queryOfCategory, currencyPriceQuery, changeUrl} = this.context;
        const {cachedData, currencyKey, productsPrices} = this.state;
        const {AddProductInCart, UpdateCurrency, ChangeProductInCart} = this;

        return (
            <CartContext.Provider value={{
                queryOfProduct, queryOfCategory, currencyPriceQuery, changeUrl,
                cachedData, productsPrices, currencyKey,
                AddProductInCart, UpdateCurrency, ChangeProductInCart
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

AddProductInCart.contextType = CartContext;

export default AddProductInCart
