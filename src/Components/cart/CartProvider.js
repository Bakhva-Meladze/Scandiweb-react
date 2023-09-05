import React, {Component} from "react";
import CartContext from "./CartContext";
import url from "../../url";
import Header from "../Header/Header";


class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedData: localStorage.getItem('cartProducts')
                ? JSON.parse(localStorage.getItem('cartProducts'))
                : null,
            listOfCartProducts: [],
            productsPrices: [],
            pricesAttributes: [],
            currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
            addCategory: ""
        }

    }

    AddProductInCart = (id, choseItemID, length = 1) => {
        const Object = {
            id: id,
            choseItemID: choseItemID,
            length: length
        }

        if (JSON.parse(localStorage.getItem("cartProducts"))) {
            let filter = 0;
            let add = JSON.parse(localStorage.getItem("cartProducts"));

            add.forEach((value, key) => {
                if (id === add[key].id && choseItemID === add[key].choseItemID) {
                    localStorage.setItem("cartProducts", JSON.stringify(add[key].length++));
                    let listOfCartProducts = this.state.listOfCartProducts;
                    filter++;
                    listOfCartProducts[key].length++;

                    this.setState({
                        listOfCartProducts: listOfCartProducts
                    });
                }

                if (filter === 0 && add.length === key + 1) {
                    if (id !== add[key].id || choseItemID !== add[key].choseItem) {
                        add.push(Object);
                    }
                }

                if (filter > key && id !== add[key].id) {
                    add.push(Object);
                }
            })

            localStorage.setItem("cartProducts", JSON.stringify(add));
            this.setState({
                cachedData: add
            })
        } else {
            localStorage.setItem("cartProducts", JSON.stringify([Object]));
            this.setState({
                cachedData: [Object]
            })
        }
    }

    componentDidMount() {
        let arr = [];
        this.state.cachedData?.forEach((value, key) => {
            const responseOption = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    query: this.context.queryOfProduct(this.state.cachedData[key].id)
                })
            };

            fetch(url, responseOption).then(response => response.json()).then(responseData => {
                const adjustedProduct = {
                    ...responseData.data.product,
                    length: this.state.cachedData[key].length,
                    chooseItemID: this.state.cachedData[key].choseItemID,
                    id: key
                };

                if (responseData) {
                    arr.push(adjustedProduct);
                    this.setState(productState => ({
                        listOfCartProducts: [...arr],
                        productsPrices: [...productState.productsPrices, responseData.data.product.prices[0].amount],
                        pricesAttributes: [...productState.pricesAttributes, ...responseData.data.product.prices],
                    }));
                }
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.cachedData?.length !== this.state.cachedData?.length) {
            this.componentDidMount();
        }
    }

    SelectCurrency = (data = 0) => {
        let array = [];
        this.state.cachedData?.map((value, key) => (
            array.push(this.state.listOfCartProducts[key].prices[data].amount)
        ));
        localStorage.setItem("currencyKey", JSON.stringify(data));
        this.setState({
            currencyKey: data,
            productsPrices: array
        });
    }

    QuantityOfProducts = () => {
        let sumResult = 0;
        this.state.cachedData?.map((value) => (
            sumResult += value.length
        ));

        return sumResult;
    }

    ChangeProductInCart = (type, key) => {
        let Object = this.state.cachedData;

        if (type === "increase") {
            let cachedData = this.state.cachedData;
            cachedData[key].length++;
            this.setState({
                cachedData: cachedData
            })
            localStorage.setItem("cartProducts", JSON.stringify(Object));
        }

        if (type === "decrease") {
            let cachedData = this.state.cachedData;
            cachedData[key].length--;
            this.setState({
                cachedData: cachedData
            })

            localStorage.setItem("cartProducts", JSON.stringify(Object));
        }

        if (this.state.cachedData[key].length === 0) {
            Object.splice(key, 1);
            this.state.cachedData.length > 0
                ? localStorage.setItem("cartProducts", JSON.stringify(Object))
                : localStorage.removeItem("cartProducts");
        }

        this.setState({
            cachedData: JSON.parse(localStorage.getItem('cartProducts')),
        })

        if (type === "decrease" && this.state.listOfCartProducts[key].length - 1 === 0) {
            this.state.listOfCartProducts.splice(key, 1);

            return;
        }

        let listOfCartProducts = this.state.listOfCartProducts;
        listOfCartProducts[key].length += type === "increase" ? 1 : -1;

        this.setState({
            listOfCartProducts: listOfCartProducts
        });
    }
    testType =(data) =>{
        this.setState({
            addCategory:data})
    }
    secondTest =(data) =>{
        console.log(data);

    }

    render() {
        const {queryOfProduct,queryOfCategory,currencyPriceQuery} = this.context;
        const {cachedData, listOfCartProducts, productsPrices, pricesAttributes, currencyKey,addCategory} = this.state;
        const {SelectCurrency, AddProductInCart, QuantityOfProducts, ChangeProductInCart, testType,secondTest,
            } = this;

        return (
            <CartContext.Provider value={{
                cachedData, listOfCartProducts, productsPrices, pricesAttributes, currencyKey,addCategory,
                SelectCurrency, AddProductInCart, QuantityOfProducts, ChangeProductInCart,testType,secondTest,
                queryOfProduct,queryOfCategory,currencyPriceQuery
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
CartProvider.contextType = CartContext;

export default CartProvider;