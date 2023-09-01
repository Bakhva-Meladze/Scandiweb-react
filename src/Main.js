import React from "react";
import CartProvider from "./Components/cart/CartProvider";
import CartContext from "./Components/cart/CartContext";


class Main extends React.Component {
    constructor(props) {
        super(props);


    }

 queryOfProduct(id) {
     return `{
    product(id: "${id}") {
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

    render() {
        return (
            <div>
                <CartProvider queryOfProduct={this.queryOfProduct()}/>
            </div>

        )
    }
}

export default Main