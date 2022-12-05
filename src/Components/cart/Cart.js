import React from 'react';
import url from "../../url";
import ImageSlider from "./ImageSlider";
import Items from "./Items"
import Foot from "./Foot"
import  ProductQueryClass from "../../querys/ProductQueryClass";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.parse(localStorage.getItem('id')),
            products: [],
            rendered: false,
            sliderCount: [],
            allPrices: [],
            quantityOfproducts: [],
        }
        this.showCurrency = this.showCurrency.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.checkout = this.checkout.bind(this);
        this.sumQuantity();
        if (this.state.id) {
            this.state.id.map((index, key) => {
                this.componentDidMount(this.state.id[key].id, key);
            });


        }
    }

    async componentDidMount(id, key) {
        let arr = [];
        const classProduct = await new ProductQueryClass();
        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: classProduct.querys(id)

            })
        }
        const response = await fetch(url, responseOption);
        const responseData = await response.json();
        if (key < this.state.id.length) {
            arr.push(key);
            this.setState(productState => ({
                products: [...productState.products, responseData.data.product],
                galery: [],
                rendered: true,
                sliderCount: [...productState.sliderCount, 0],
                allPrices: [...productState.allPrices, responseData.data.product.prices[localStorage.getItem("currencyKey")].amount],
                quantityOfproducts: [...productState.quantityOfproducts, this.state.id[key].length]
            }));
        }
    }

    showCurrency() {
        let data = localStorage.getItem("currencyKey");
        data = JSON.parse(data);
        return data
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.number = prevState.quantityOfproducts[0]
    }

    changeQuantity(e, key) {
        let arr = [];
        if (e === "plus") {
            this.state.id[key].length++;
            localStorage.setItem("id", JSON.stringify(this.state.id));
            for (let i = 0; i < this.state.id.length; i++) {
                arr.push(this.state.id[i].length);
            }
            this.setState({
                number: key
            })
            this.setState({
                id: this.state.id,
                quantityOfproducts: arr
            })
        }
        if (e === "minus" && this.state.id[key].length > 0) {
            this.state.id[key].length--;
            if (this.state.id[key].length === 0) {
                this.state.id.splice(key, key)
                this.state.item.splice(key, key);
                this.state.products.splice(key, key);

                this.setState({
                    id: this.state.id,
                    item: this.state.item,
                    products: this.state.products
                })
                localStorage.setItem("id", JSON.stringify(this.state.id));
            }
            localStorage.setItem("id", JSON.stringify(this.state.id));
            for (let i = 0; i < this.state.id.length; i++) {
                arr.push(this.state.id[i].length);
            }
            this.setState({
                id: this.state.id,
                quantityOfproducts: arr
            })

        }
        localStorage.setItem("id", JSON.stringify(this.state.id));
    }

    sumQuantity() {
        return this.state.quantityOfproducts.reduce((one, two) => {
            return parseInt(one + two)
        }, 0)
    }

    checkout() {
        return "none";
    }

    render() {
        return (
            <div className={`${this.props.dataFromHeader ? "cart-overlay" : "cart"}`}>
                {this.props.dataFromHeader ?
                    <div className="title">
                        <span className="brand">{"My Bag  ,"}</span>
                        <span
                            className="items">{this.props.dataFromHeader ? this.sumQuantity() : this.sumQuantity()} items</span>
                    </div>
                    :
                    <div className="title">
                        <span>CART</span>
                    </div>
                }
                {this.state.rendered && (
                    this.state.products.map((value, key) => {
                        return <div
                            className={`${this.props.dataFromHeader ? "container-overflow-item" : "container-item"}`}
                            key={key}>
                            <Items
                                dataFromHeader={this.props.dataFromHeader}
                                mykey={key}
                                brand={this.state.products[key].brand}
                                name={this.state.products[key].name}
                                currency={this.state.products[key].prices}
                                productItems={this.state.products[key].attributes}
                                showCurrenykey={this.showCurrency()}
                            />
                            <div
                                className={`${this.props.dataFromHeader ? "content-right-overflow" : "content-right"}`}>
                                <div key={key}
                                     className={`${this.props.dataFromHeader ? "quantity-switcher-overflow" : "quantity-switcher"}`}>
                                    <div className={`${this.props.dataFromHeader ? "sum-overflow" : "sum"}`}>
                                        <div onClick={() => this.changeQuantity("plus", key)} className="sum-button">
                                            +
                                        </div>
                                        <span style={{textAlign: "center"}}>{this.state.id[key].length}</span>
                                        <div onClick={() => this.changeQuantity("minus", key)} className="sum-button">
                                            -
                                        </div>
                                    </div>
                                </div>
                                <ImageSlider
                                    dataFromHeader={this.props.dataFromHeader}
                                    count={this.state.sliderCount}
                                    images={this.state.products[key].gallery}
                                    myKey={key}
                                />
                            </div>
                        </div>
                    })
                )}
                {this.state.rendered && (
                    <Foot
                        dataFromHeader={this.props.dataFromHeader}
                        currency={this.state.products[0].prices}
                        showCurrenykey={this.showCurrency()}
                        prices={this.state.id.map((value, key) =>
                            this.state.id[key].length * this.state.allPrices[key])}
                        sumQuantity={this.sumQuantity()}
                    />

                )}
                {this.props.dataFromHeader ?
                    <div>
                        <button className="overflow-button-wiev"
                                onClick={() => window.location.pathname = "/Cart"}>
                            <span className="overflow-value">WIEV BAG</span>
                        </button>
                        <button className="overflow-button-checkout"
                                onClick={() => this.props.dataFromHeader === false}>
                            <span className="overflow-value-checkout">CHECK OUT</span>
                        </button>

                    </div>
                    : null
                }
            </div>
        )
    }
}
export default Cart
