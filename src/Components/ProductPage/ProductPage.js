import React from 'react';
import url from "../../url";
import propTypes from "prop-types";
import ProductQueryClass from "../../querys/ProductQueryClass";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            img: [],
            key: 0,
            data: [],
            item: [],
            rendered: false,
            color: '',
            choseItemId: "",
            id: window.location.pathname.split("/")[2],
        }
        this.changeKey = this.changeKey.bind(this);
        this.passDataSession = this.passDataSession.bind(this);
        this.addSelectItem = this.addSelectItem.bind(this);
        this.showCurrency = this.showCurrency.bind(this);
        this.passDataSession();
    }
    async componentDidMount() {
         const classProduct =  await new ProductQueryClass();
         const responseOptions =  {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query:  classProduct.querys(this.state.id)
            })
        }
         const response = await fetch(url, responseOptions);
        const responseData = await response.json();
        this.setState({
            products: responseData.data.product,
            img: responseData.data.product.gallery,
            item: responseData.data.product.attributes[0],
            rendered: true
        });
     }
    changeKey(key){
        this.setState({
            key: key,
        })
    }
    passDataSession() {
        if(this.state.rendered) {
            const Object = {
                id: this.state.id,
                item: this.state.item.id,
                choseItem: this.state.choseItemId,
                length:localStorage.getItem('id') ?
                    JSON.parse(localStorage.getItem("id")[localStorage.getItem("id").length-1].length):1
            }
            if (localStorage.getItem("id")) {
                let filter=0;
                let add = JSON.parse(localStorage.getItem("id"));
                add.map((value,key) => {
                    if(this.state.id === add[key].id && this.state.choseItemId === add[key].choseItem) {
                         localStorage.setItem("id", JSON.stringify(add[key].length++));
                         filter++;
                     }
                     if(filter===0 && add.length === key+1){
                         if( this.state.id !== add[key].id || this.state.choseItemId !== add[key].choseItem) {
                             add.push(Object);
                         }
                     }
                     if( filter > key && this.state.id !== add[key].id) {
                         add.push(Object);
                     }
                })
                localStorage.setItem("id", JSON.stringify(add));
            } else {
                localStorage.setItem("id", JSON.stringify([Object]));
            }
        }
    }
    addSelectItem (count) {
        this.setState({
            color: "black",
            choseItemId: count
        });
    }
    showCurrency() {
        let data = localStorage.getItem("currencyKey");
         data = JSON.parse(data);
        return data
    }
    description () {

        return <div dangerouslySetInnerHTML={{ __html: this.state.products.description }} />
    }
    render() {
        return(
            <div className="main-product">
                <div className="container-pic">
                { this.state.img.map((value,key)=>{
                    return <div className="select-pic" key={key} onClick={()=>this.changeKey(key)}>
                        <img  src={value} />
                    </div>
                })}
                </div>
                <div className="apolo">
                    <img className="main-picture" src={this.state.img[this.state.key]}/>
                    <div>
                        <p className="brand">{this.state.products.brand}</p>
                        <p className="name">{this.state.products.name}</p>
                        {this.state.rendered && (
                            <div>
                                <p className = "size" >{this.state.item.id}:</p>
                                {this.state.item.id === "Color" ?
                                    <div className="items">
                                        {this.state.products.attributes[0].items.map(item => {
                                            return <div className="item" key={item.id}
                                                        onClick={() => this.addSelectItem(item.id)}
                                                        style={{
                                                            backgroundColor: item.id,
                                                            border: this.state.choseItemId === item.id ? "1px solid green" : "white",
                                                            color: this.state.choseItemId === item.id ? "white" : "black"
                                                        }}>
                                            </div>
                                        })}
                                    </div> :
                                    <div className="items">
                                        {this.state.item.items.map(item => {
                                            return <div className="item" key={item.id}
                                                        onClick={() => this.addSelectItem(item.id)}
                                                        style={{
                                                            backgroundColor: this.state.choseItemId === item.id ? "black" : "white",
                                                            color: this.state.choseItemId === item.id ? "white" : "black"
                                                        }}>
                                                <p className="value">{item.value}</p>
                                            </div>
                                        })}
                                    </div>
                                }
                            </div>
                        )}
                        <p className= "price"> Price:</p>
                        {this.state.rendered && (
                            <div className='currency'>
                                {this.state.products.prices[this.showCurrency()].currency.symbol}
                                {' '+this.state.products.prices[this.showCurrency()].amount}
                            </div>
                        )}
                        <button className="button" onClick={() => this.passDataSession()}>Add Cart</button>
                        {this.description()}
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductPage
// eslint-disable-next-line react/no-typos
ProductPage.propTypes = {
    data: propTypes.string

}