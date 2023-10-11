import React, {Component} from "react";
import CartContext from "./CartContext";
import CartProvider from "./CartProvider";
class AddProductInCart extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cachedData: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts'))
              : null,
          listOfCartProducts: [],
          productSum:[],
          currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
          productsPrices: [],
      }
  }
  SelectChangeCurrency =(data,array) =>{
      this.setState({
          currencyKey: data,
          productsPrices: array
      })
  }
  componentDidMount() {
      let arr =[];
      this.state.cachedData?.map((value, key) => {
           arr.push(value.prices[this.state.currencyKey]);

      });
      this.setState({
          productsPrices: arr
      });

  }

     AddProductInCart = (id, choseItemID, gallery,prices,items,brand,name,length = 1) => { // (product, chooseItemId = null)
      console.log(choseItemID);
      alert("hi");
         const Object = {
             id: id,
             choseItemID,
             length: length,
             gallery: gallery,
             prices: prices,
             items: items,
             brand: brand,
             name: name
         }
         this.setState(prevState => ({
             productsPrices: [...prevState.productsPrices,prices[this.state.currencyKey]],
         }));
         if (JSON.parse(localStorage.getItem("cartProducts"))) {
             let filter = 0;
             let add = JSON.parse(localStorage.getItem("cartProducts"));
             add.forEach((value, key) => {
                 if (id === add[key].id && choseItemID === add[key].choseItemID) {
                     add[key].length++;
                     console.log(add);
                     filter++;
                     this.setState({
                         cachedData: add
                     });
                 }

                 if (filter === 0 && add.length === key + 1) {
                     if (id !== add[key].id || choseItemID !== add[key].choseItemID) {
                         add.push(Object);
                     }
                 }

                 if (filter > key && id !== add[key].id) {
                     add.push(Object);
                 }
             })
             localStorage.setItem("cartProducts", JSON.stringify(add));
             this.setState({
                 cachedData: add
             })
         } else {
             localStorage.setItem("cartProducts", JSON.stringify([Object]));
             this.setState({
                 cachedData: [Object]
             })
         }

     }
    render() {
        const {queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl} = this.context;
        const{cachedData,listOfCartProducts,currencyKey,productsPrices} = this.state;
        const {AddProductInCart,SelectChangeCurrency} =this;

        return (
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
                cachedData,listOfCartProducts,productsPrices,currencyKey,
                AddProductInCart,SelectChangeCurrency}}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
AddProductInCart.contextType = CartContext;

export default AddProductInCart
