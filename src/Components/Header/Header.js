import React from "react";
import iconBox from "../../images/logo.svg";
import url from "../../url";
import Error from "../../Error";
import Category from "./Category";
import Currency from "./Currency";
import CartContext from "../cart/CartContext";
import Overlay from "./overlay/Overlay";
import Loading from "../../Loading";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: [],
            categories: [],
            error: null,
            filter: true
        }
    }

    async componentDidMount() {
        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.currencyPriceQuery()
            })
        }
        try {
            const response = await fetch(url, responseOption);
            const responseData = await response.json();
            this.setState({
                currency: responseData.data.product.prices,
                categories: responseData.data.categories,
                filter: false
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
                {({SelectCurrency, currencyKey,selectCategoryType}) => (
                    <div className="header">
                        {this.state.filter?<Loading />:''}
                        <Category  categories={this.state.categories} selectCategoryType={selectCategoryType}/>
                        <div className="logo"><img src={iconBox} alt="logo"/></div>
                        <div className="right">
                            <Currency SelectCurrency={SelectCurrency}
                                      currency={this.state.currency}
                                      currencyKey={currencyKey}
                            />
                           <Overlay />
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}
Header.contextType = CartContext;


export default Header