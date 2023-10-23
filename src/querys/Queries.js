import React from "react";
import CartProvider from "../Components/cart/CartProvider";
import CartContext from "../Components/cart/CartContext";


class Queries extends React.Component {
    constructor(props) {
        super(props);


    }

 queryOfProduct(id) {
        return `{
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      category
     attributes {
       id
       name
       type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
  }`;
}
    queryOfCategory(data) {

        return `{ category(input:{ title: "${data}"}) {
    name
    products{
    id
      name
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
            
    }
  }
}`;
    }
    currencyPriceQuery(){
        return `{
                   product(id: "huarache-x-stussy-le") {
                      prices {
                         currency {
                           label
                           symbol
                         }
                           amount
                      }
                    }
                    categories{
                           name
                   }
               }`;
    }

    render() {
        const {changeUrl} = this.context;
        const {queryOfProduct,queryOfCategory,currencyPriceQuery} =this;
        return (
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl}}>
                {this.props.children}
            </CartContext.Provider>

        )
    }
}
Queries.contextType = CartContext;


export default Queries