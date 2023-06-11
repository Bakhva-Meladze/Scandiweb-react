import React from "react";
import url from "../../url.js";
import ProductQueryClass from "../../querys/ProductQueryClass";
import CartContext from "../cart/CartContext";
import ProductCard from "./ProductCard";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsCategory: [],
            currencySymbols: '',
        }
    }

    async componentDidMount() {
        let category = await new ProductQueryClass()
        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: category.queryOfCategory()

            })
        }
        const response = await fetch(url, responseOption);
        const responseData = await response.json();
        this.setState({
            productsCategory: responseData.data.category.products,
        })
    }

    render() {
        return (
            <CartContext.Consumer>
                {({AddProductInCart, pricesAttributes, currencyKey}) => (
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

export default CategoryPage
