import React from "react";
import iconBox from "../../images/logo.svg";
import url from "../../url";
import ProductQueryClass from "../../querys/ProductQueryClass";
import Error from "../../Error";
import Category from "./Category";
import Currency from "./Currency";
import CartContext from "../cart/CartContext";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: [],
            categories: [],
            error: null
        }
    }

    async componentDidMount() {
        const classProduct = await new ProductQueryClass();
        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: classProduct.currencyPriceQuery()
            })
        }
        try {
            const response = await fetch(url, responseOption);
            const responseData = await response.json();
            this.setState({
                currency: responseData.data.product.prices,
                categories: responseData.data.categories
            });
        } catch (Error) {
            this.setState({
                error: Error
            })
        }
    }

    render() {

        if (this.state.error) {
            return (
                <div>
                    <Error propError={this.state.error.toString()}/>
                </div>
            )
        }

        return (
            <CartContext.Consumer>
                {({SelectCurrency, QuantityOfProducts, currencyKey,testType}) => (
                    <div className="header">
                        <Category  categories={this.state.categories} testType ={testType}/>
                        <div className="logo"><img src={iconBox} alt="logo"/></div>
                        <div className="right">
                            <Currency SelectCurrency={SelectCurrency}
                                      currency={this.state.currency}
                                      currencyKey={currencyKey}
                            />
                            {React.cloneElement(
                                this.props.children, {
                                    QuantityOfProducts: QuantityOfProducts()
                                })}
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Header