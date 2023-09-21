import React, {Component} from "react";
import CartContext from "./CartContext";
import CartProvider from "./CartProvider";
class AddProductInCart extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cachedData: localStorage.getItem('cartProducts')
              ? JSON.parse(localStorage.getItem('cartProducts'))
              : null,
          listOfCartProducts: [],
          productSum:[],
          currencyKey: localStorage.getItem("currencyKey") ? localStorage.getItem("currencyKey") : 0,
          productsPrices: []


      }
      console.log(this.state.cachedData);



  }
  testData =(data,array) =>{
      console.log(data);
      this.setState({
          currencyKey: data,
          productsPrices: array
      })
  }
  componentDidMount() {
      console.log(this.state.cachedData);
      let arr =[];
      this.state.cachedData?.map((value, key) => {
           arr.push(value.prices[this.state.currencyKey].amount);

      });
      this.setState({
          productsPrices: arr

      });

  }



     ChangeProductInCart = (type, key) => {
         let Object = this.state.cachedData;

         if (type === "increase") {
             let cachedData = this.state.cachedData;
             cachedData[key].length++;
             this.setState({
                 cachedData: cachedData
             })
             localStorage.setItem("cartProducts", JSON.stringify(Object));
         }

         if (type === "decrease") {
             let cachedData = this.state.cachedData;
             cachedData[key].length--;
             this.setState({
                 cachedData: cachedData
             })

             localStorage.setItem("cartProducts", JSON.stringify(Object));
         }

         if (this.state.cachedData[key].length === 0) {
             Object.splice(key, 1);
             this.state.cachedData.length > 0
                 ? localStorage.setItem("cartProducts", JSON.stringify(Object))
                 : localStorage.removeItem("cartProducts");
         }

         this.setState({
             cachedData: JSON.parse(localStorage.getItem('cartProducts')),
         })

         if (type === "decrease" && this.state.listOfCartProducts[key].length - 1 === 0) {
             this.state.listOfCartProducts.splice(key, 1);
             return;
         }

         let listOfCartProducts = this.state.listOfCartProducts;
         listOfCartProducts[key].length += type === "increase" ? 1 : -1;

         this.setState({
             listOfCartProducts: listOfCartProducts
         });
     }

     AddProductInCart = (id, choseItemID, gallery,prices,items,brand,name,length = 1) => {
         const Object = {
             id: id,
             choseItemID: choseItemID,
             length: length,
             gallery: gallery,
             prices: prices,
             items: items,
             brand: brand,
             name: name
         }
         this.setState(prevState => ({
             productsPrices: [...prevState.productsPrices,prices[this.state.currencyKey].amount]

         }));
         if (JSON.parse(localStorage.getItem("cartProducts"))) {
             let filter = 0;
             let add = JSON.parse(localStorage.getItem("cartProducts"));


             add.forEach((value, key) => {
                 if (id === add[key].id && choseItemID === add[key].choseItemID) {
                     localStorage.setItem("cartProducts", JSON.stringify(add[key].length++));
                     let listOfCartProducts = this.state.listOfCartProducts;
                     filter++;
                     listOfCartProducts[key].length++;

                     this.setState({
                         listOfCartProducts: listOfCartProducts
                     });
                 }

                 if (filter === 0 && add.length === key + 1) {
                     if (id !== add[key].id || choseItemID !== add[key].choseItem) {
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
        const{cachedData,listOfCartProducts,currencyKey} = this.state;
        const {AddProductInCart,ChangeProductInCart,testData} =this;

        return (
            <CartContext.Provider value={{
                queryOfProduct,queryOfCategory,currencyPriceQuery,changeUrl,cachedData,listOfCartProducts,
                AddProductInCart,ChangeProductInCart,testData}}>
                {this.props.children}
                {<CartProvider data={this.state.cachedData}/>}
            </CartContext.Provider>
        );
    }
}
AddProductInCart.contextType = CartContext;

export default AddProductInCart
