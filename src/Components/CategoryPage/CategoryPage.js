import React from 'react';
import  url from "../../url.js";
import ProductQueryClass from "../../querys/ProductQueryClass"
import ProductCard from "./ProductCard";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            products: [],
            test: [1,2,3],
            currencySymbols: ''
        }
        this.test = this.test.bind(this);
    }
    async componentDidMount() {
        let category =  await new ProductQueryClass()
        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: category.queryOfCategory()

            })
        }
        const response = await fetch(url, responseOption);
         const responseData =  await response.json();
        this.setState({
            products: responseData.data.category.products
        })
    }
    render() {
        return(
                <div className= "category-page">
                {this.state.products.map((product,key)=>
                    <ProductCard key={product.id} product={product} />
                    )}
                 </div>

        )


    }

}

export default CategoryPage
