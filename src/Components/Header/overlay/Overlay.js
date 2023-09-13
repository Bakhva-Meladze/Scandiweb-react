import React from "react";
import icon from '../../../images/emptyCart.svg';
import Category from "../Category";
import iconBox from "../../../images/logo.svg";
import Currency from "../Currency";
import CartContext from "../../cart/CartContext";

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartOverlay: false,
        }
        this.OpenCart = this.OpenCart.bind(this);
    }

    OpenCart() {
        this.setState({
            showCartOverlay: !this.state.showCartOverlay
        })
    }

    render() {
        return (
            <CartContext.Consumer>
                {({QuantityOfProducts}) => (
                    <>
                        <div className={this.state.filterCart ? "basket-container" : "basket-container remove-display"}
                             onClick={() => this.OpenCart()}>
                            <img className="basket" src={icon} alt={"basket"}/>
                            <div className="circle">
                                <span className="circle-value">{QuantityOfProducts()}</span>
                            </div>
                        </div>
                        <div className={this.state.showCartOverlay ? "overlay" : "remove"}>
                            <div className="cart-overlay">
                                <div className="title">
                                        <span className="brand">{"My Bag  ,"}</span>
                                        <span className="items">{QuantityOfProducts()} items</span>
                                    :
                                    <span>CART</span>
                                </div>
                            </div>

                        </div>

                    </>

                )}
            </CartContext.Consumer>

        )
    }
}

export default Overlay