import React from 'react';
import icon from '../../images/emptyCart.svg';
import iconBox from '../../images/Group.svg';
import arrowUp from '../../images/arrowUp.svg';
import arrowDown from '../../images/arrowDown.svg';
import url from "../../url";
import Cart from '../cart/Cart'
import  ProductQueryClass from "../../querys/ProductQueryClass";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            options: 'all',
            trueFalse: false,
            currencySign: JSON.parse(localStorage.getItem('currencySymbol')),
            currency: [],
            currencyKey: 1,
            popup: "none",

        }
        this.addressRouter = this.addressRouter.bind(this);
        this.passQuery = this.passQuery.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.oddEven = this.oddEven.bind(this);
        this.cart = this.cart.bind(this);

    }
    async componentDidMount() {
        const classProduct =  await new ProductQueryClass();

        const responseOption = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query:  classProduct.currencyPriceQuery()
            })
        }
        const response = await fetch(url, responseOption);
        const responseData =  await response.json();
        this.setState({
            currency: responseData.data.product.prices,

        })
    }
    cart (e) {
        e === true ?
        this.setState({
            popup: "none"
        }): this.setState({
            popup: "block"

            })
    }

    passQuery() {
        return this.state.options

    }
    changeCurrency(currency,key) {
        localStorage.setItem('currencyKey',JSON.stringify(key));
        localStorage.setItem('currencySymbol', JSON.stringify(currency));
        this.setState({
            currencySign: currency,
        });
        window.location.reload();
    }
    addressRouter(callData) {
        window.location.pathname !== "category"?
            window.location.pathname =  "category/"+callData :
            window.location.pathname =callData
         this.setState({
            options: callData
        })
    }
    oddEven(e){
            this.setState({
                trueFalse: !this.state.trueFalse
            });
    }
    render() {

        return(
            <div className="header">
                <div className="navigation">
                    <label className="btn">
                        <p onClick={() =>this.addressRouter("all")}>All</p>
                    </label>
                    <label className="btn">
                        <p onClick={() =>this.addressRouter("clothes")}>Clothes</p>
                    </label>
                    <label className="btn">
                        <p onClick={() => this.addressRouter("tech")}>Tech</p>
                    </label>
                </div>
                <div className="logo">
                    <img  src={iconBox}/>
                </div>
                <div className="right">
                    <div className = "currency">
                        <h3 className='dollar'>{this.state.currencySign}</h3>
                        {this.state.trueFalse === true?
                            <div className="container" style={{display: "block"}}>
                                {this.state.currency.map((value, key)=>{
                                    return <div mykey={key}>
                                        <h3 onClick={()=>this.changeCurrency(this.state.currency[key].currency.symbol,key)}
                                            className="sectionCurrency">
                                            {this.state.currency[key].currency.symbol} {this.state.currency[key].currency.label}
                                        </h3>
                                    </div>
                                })}
                            </div>:
                            <div className="container" style={{display: "none"}}> </div>  }
                    </div>
                    <div onClick={()=> this.oddEven()}>
                        {this.state.trueFalse === true?
                            <img className="arrow" src={arrowUp} />
                            :
                            <img className="arrow" src={arrowDown}/>
                        }
                    </div>
                    <div onClick={()=> this.state.popup ==="block"?this.cart(true)
                        :
                        this.cart(false)}>
                        <img className={"basket"} src={icon}/>
                    </div>
                    <div className="circle">
                        <span className="circle-value">{localStorage.getItem('quantity')}</span>
                    </div>
                    <div className="overlay" style={{display: this.state.popup}} onClick={()=> this.cart(true)}>
                        <Cart dataFromHeader={true}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Header