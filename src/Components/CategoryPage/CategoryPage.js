import React from "react";
import url from "../../url.js";
import CartContext from "../cart/CartContext";
import ProductCard from "./ProductCard";
import cartContext from "../cart/CartContext";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsCategory: [],
            currencySymbols: '',
            states: null,
            add: window.location.pathname.slice(10, window.location.href.length)
        }

    }
    async componentDidMount() {

        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.queryOfCategory(this.state.add)

            })
        }
        const response = await fetch(url, responseOption);
        const responseData = await response.json();
        this.setState({
            productsCategory: responseData.data.category.products,
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.add !== window.location.pathname.slice(10, window.location.href.length)){
            this.setState({
                add: window.location.pathname.slice(10, window.location.href.length)
            })
            this.componentDidMount();
        }
    }
    render() {
        return (
            <CartContext.Consumer>
                {({AddProductInCart, pricesAttributes,currencyKey}) => (
                    <div className="category-page">

                        {this.state.productsCategory.map((productCategory, key) => (
                            <ProductCard key={productCategory.id} productCategory={productCategory}
                                         AddProductInCart={AddProductInCart}
                                         pricesAttributes={pricesAttributes}
                                         currencyKey={currencyKey}
                                         prices={this.state.prices}
                            />
                        ))}
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}
CategoryPage.contextType = CartContext;

export default CategoryPage
