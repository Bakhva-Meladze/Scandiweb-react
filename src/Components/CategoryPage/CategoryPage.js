import React from "react";
import url from "../../url.js";
import CartContext from "../cart/CartContext";
import ProductCard from "./ProductCard";
import cartContext from "../cart/CartContext";
import { Link } from 'react-router-dom';
import Loading from "../../Loading";


class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsCategory: [],
            currencySymbols: '',
            states: null,
            add: "all",
            filter: true
        }

    }
     componentDidMount() {

        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.queryOfCategory(this.context.addCategory)

            })
        }
        fetch(url, responseOption).then(response => response.json()).then(responseData => {
            this.setState({
                productsCategory: responseData.data.category.products,
                filter: false
            })
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.add !== this.context.addCategory){
            this.setState({
                add: this.context.addCategory
            })
            this.componentDidMount();
        }
    }
    render() {
        return (
            <CartContext.Consumer>
                {({AddProductInCart, pricesAttributes,currencyKey}) => (
                    <div className="category-page">
                        {this.state.filter?<Loading />:null}

                        {this.state.productsCategory.map((productCategory, key) => (
                            <ProductCard key={productCategory.id}
                                         productCategory={productCategory}
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
