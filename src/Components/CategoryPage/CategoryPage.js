import React from "react";
import url from "../../url.js";
import CartContext from "../cart/CartContext";
import ProductCard from "./ProductCard";
import Loading from "../../Loading";


class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productsCategory: [],
            selectedCategory: "",
            loading: true
        }

    }
     componentDidMount() {

        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.queryOfCategory(this.context.selectedCategory)

            })
        }
        fetch(url, responseOption).then(response => response.json()).then(responseData => {
            this.setState({
                productsCategory: responseData.data.category.products,
                loading: false
            })
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.selectedCategory !== this.context.selectedCategory){
            this.setState({
                selectedCategory: this.context.selectedCategory
            })
            this.componentDidMount();
        }
    }
    render() {
        return (
            <CartContext.Consumer>
                {({AddProductInCart,currencyKey}) => (
                    this.state.loading?
                        <Loading/>
                        :
                        <div className="category-page">
                            {this.state.productsCategory.map((productCategory, key) => (
                                <ProductCard
                                    key={productCategory.id}
                                    productCategory={productCategory}
                                    AddProductInCart={AddProductInCart}
                                    currencyKey={currencyKey}

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
