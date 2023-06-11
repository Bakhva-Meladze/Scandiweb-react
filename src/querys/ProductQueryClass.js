import {Component} from "react";

export default class ProductQueryClass extends Component {
    constructor(id, props) {
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

    currencyPriceQuery() {
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

    queryOfCategory(data = '') {
        return `{ category(input:{ title: "${window.location.pathname.slice(10, window.location.href.length)}"}) {
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
}

