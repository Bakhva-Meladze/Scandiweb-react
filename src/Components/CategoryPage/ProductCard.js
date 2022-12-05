import React from 'react';
import ProductQueryClass from "../../querys/ProductQueryClass";
import ProductPage from "../ProductPage/ProductPage";
import icon from '../../images/whiteCart.svg';

class ProductCard extends React.Component {

    constructor(props) {
        super(props);
         this.state ={
             id: this.props.product.id,
             stock: this.props.product.inStock,

        }
        this.show();
        this.addToCart = this.addToCart.bind(this);

    }
    show() {
        let data = localStorage.getItem("currencyKey");
        data = JSON.parse(data);
        return data
    }
    addToCart (){
        if (this.props.product.attributes.length ===0){
            const Object = {
                id: this.state.id,
                length:localStorage.getItem('id') ?
                    JSON.parse(localStorage.getItem("id")[localStorage.getItem("id").length-1].length):1
            }
            if(localStorage.getItem("id")){
                let filter = 0;
                let add = JSON.parse(localStorage.getItem("id"));
                add.map((value,key)=> {
                    if(this.props.product.id === add[key].id){
                        localStorage.setItem("id", JSON.stringify(add[key].length++));
                        filter++
                    }
                    if( filter === 0 &&  add.length === key+1) {
                        if(this.props.product.id !== add[key].id){
                            alert("hi")
                            add.push(Object);

                        }
                    }
                    if(filter > key && this.props.product.id !== add[key].id){
                        add.push(Object);

                    }

                })
                localStorage.setItem("id", JSON.stringify(add));
            }
            else {
                localStorage.setItem("id", JSON.stringify([Object]));

            }



        }else{
            window.location.pathname = "/Product/"+this.state.id;

        }

    }
    render() {
        return (
            <div className="product-card">
                <span style={{ display: this.state.stock === true ? "none":"block"}}
                      className={`${this.state.stock ===true? "":"value-stock"}`}>{"OUT OF THE STOCK"}</span>
                <img className={`${this.state.stock ===true?"pictures":"out-stock"}`}
                     src={this.props.product.gallery[0]}
                />
                <div className="basket-img">
                    <img className="img-value" onClick={()=> this.addToCart()} src={icon} />
                </div>
                <div className="name">
                    <span>{this.props.product.name}</span>
                    <div className='currency'>
                        {this.props.product.prices[this.show()].currency.symbol}
                        {' '+this.props.product.prices[this.show()].amount}
                    </div>
                </div>
            </div>
        )
    }

}
export default ProductCard