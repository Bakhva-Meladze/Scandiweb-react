import React from 'react';
 class Items extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             id: JSON.parse(localStorage.getItem('id')),
             productsItem: this.props.productItems,

         }
     }

     render() {
         return (
             <div className={`${this.props.dataFromHeader ? "content-overlay" : "content"}`}>
                 <span className={`${this.props.dataFromHeader ? "brand-overlay" : "brand"}`}>{this.props.brand}</span>
                 <span className={`${this.props.dataFromHeader ? "name-overlay" : "name"}`}> {this.props.name}</span>
                 <div className={`${this.props.dataFromHeader ? "currency-overlay" : "currency"}`}>
                     {this.props.currency[this.props.showCurrenykey].currency.symbol}
                     {this.props.currency[this.props.showCurrenykey].amount}
                 </div>
                 {this.state.productsItem.length > 0 ?
                     <div className={`${this.props.dataFromHeader ? "attribute-overlay" : "attribute"}`}>
                         <span
                             className={`${this.props.dataFromHeader ? "size-overlay" : "size"}`}>{this.state.productsItem[0].id} :</span>
                         {this.state.productsItem[0].id === "Color" ?
                             <div className={`${this.props.dataFromHeader ? "items-overlay" : "items"}`}>
                                 {this.state.productsItem[0].items.map((item, key) => {
                                     if (key < 3) {
                                         return <div
                                             className={`${this.props.dataFromHeader ? "item-overlay" : "item"}`}
                                             key={item.id}
                                             style={{
                                                 backgroundColor: item.id,
                                                 border: this.state.id[this.props.mykey].choseItem === item.id ?
                                                     '1px solid #5ECE7B' : "white",
                                                 color: this.state.id[this.props.mykey].choseItem === item.id ? "white" : "black"
                                             }}>
                                         </div>
                                     }
                                 })}
                             </div>
                             :
                             <div className={`${this.props.dataFromHeader ? "items-overlay" : "items"}`}>
                                 {this.state.productsItem[0].items.map((item, key) => {
                                     return <div className={`${this.props.dataFromHeader ? "item-overlay" : "item"}`}
                                                 key={item.id}
                                                 style={{
                                                     backgroundColor: this.state.id[this.props.mykey].choseItem === item.id ?
                                                         "black" : "white",
                                                     color: this.state.id[this.props.mykey].choseItem === item.id ? "white" :
                                                         "black"
                                                 }}>
                                            <span
                                                className={`${this.props.dataFromHeader ? "value-overlay" : "value"}`}>
                                                {item.value}
                                            </span>
                                     </div>
                                 })}
                             </div>
                         }
                     </div> : null}
             </div>
         )
     }
 }
export default Items