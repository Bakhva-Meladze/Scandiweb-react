import React, {Component} from "react";



export default class ProductQueryClass extends Component {
    constructor(id, props) {
        super(props);
    }

    querys(id) {
        const table = `{
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
}`
        return table
    }

    currencyPriceQuery() {
        const table =
            `{
                   product(id: "huarache-x-stussy-le") {
                      prices {
                         currency {
                           label
                           symbol
                         }
                           amount
                      }
                    }
               }
            `
        return table
    }
    queryOfCategory(){
        const table = `{ category(input:{ title: "${window.location.pathname.slice(10,window.location.href.length)}"}) {
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
}
`
        return table;
    }
}

