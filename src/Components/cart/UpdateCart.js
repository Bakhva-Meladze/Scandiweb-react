import React, {Component} from "react";
import CartContext from "./CartContext";
class AddProductInCart extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cachedData: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts'))
              : null,
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
  /*componentDidMount() {
      let arr =[];
      this.state.cachedData?.map((value, key) => {
           arr.push(value.prices[this.state.currencyKey]);

      });
      console.log(arr);
      this.setState({
          productsPrices: arr
      });

  }*/

     AddProductInCart = (product, choseItemID =false,length = 1) => { // (product, chooseItemId = null)
         const Object = {
             id: product.id,
             choseItemID,
             length: length,
             gallery: product.gallery,
             prices: product.prices,
             items: product.attributes,
             brand: product.brand,
             name: product.name,
         }
         /*this.setState(prevState => ({
             productsPrices: [...prevState.productsPrices,product.prices[this.state.currencyKey]],
         }));*/
         if (JSON.parse(localStorage.getItem("cartProducts"))) {
             let add = JSON.parse(localStorage.getItem("cartProducts"));

             let newItem = true;

             add?.forEach((value, key) => {

                 if(product.id === add[key].id){
                     if(JSON.stringify(choseItemID) === JSON.stringify(value.choseItemID)) {
                         add[key].length += 1;
                         newItem = false;
                         this.setState({
                             cachedData: add
                         });
                         localStorage.setItem("cartProducts", JSON.stringify(add));
                     }
                 }
             });

             if (newItem) {
                 add.push(Object);
                 localStorage.setItem("cartProducts", JSON.stringify(add))
                 this.setState({
                     cachedData: add
                 })
             }
         } else {
             localStorage.setItem("cartProducts", JSON.stringify([Object]));
             this.setState({
                 cachedData: [Object]
             })
         }

     }
    ChangeProductInCart = (type, key) => {
        let Object = this.state?.cachedData;
        Object[key].length += (type === "increase" ? 1 : -1);

        if (this.state.cachedData[key].length === 0) {
            console.log(Object);
            Object.splice(key, 1);
            localStorage.setItem("cartProducts", JSON.stringify(Object));
        }
        this.setState({
            cachedData: Object
        })
        localStorage.setItem("cartProducts", JSON.stringify(Object.length < 1 ? null : Object));
    }
    render() {
        const {queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl} = this.context;
        const{cachedData,currencyKey,productsPrices} = this.state;
        const {AddProductInCart,SelectChangeCurrency,ChangeProductInCart} =this;

        return (
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,
                cachedData,productsPrices,currencyKey,
                AddProductInCart,SelectChangeCurrency,ChangeProductInCart}}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
AddProductInCart.contextType = CartContext;

export default AddProductInCart
