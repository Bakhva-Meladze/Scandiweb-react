import React from "react";
import icon from '../../images/emptyCart.svg';

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
            <>
                <div className={this.state.filterCart ? "basket-container" : "basket-container remove-display"}
                     onClick={() => this.OpenCart()}>
                    <img className="basket" src={icon} alt={"basket"}/>
                    <div className="circle">
                        <span className="circle-value">{this.props.QuantityOfProducts}</span>
                    </div>
                </div>
                <div className={this.state.showCartOverlay ? "overlay" : "remove"}>
                    {React.cloneElement(this.props.children, {
                        cart: this.OpenCart,
                        dataFromHeader: true
                    })}
                </div>
            </>
        )
    }
}

export default Overlay