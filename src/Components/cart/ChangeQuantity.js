import React from "react";

class ChangeQuantity extends React.Component {
    UpdateCart = (type) => {
        this.props.ChangeProductInCart(type, this.props.index);
    }

    render() {
        return (
            <div className="quantity-switcher">
                <div className="sum">
                    <div onClick={() => this.UpdateCart("increase")} className="sum-button">
                        +
                    </div>
                    <span className="product-quantity">
                        {this.props.productQuantity}
                    </span>
                    <div onClick={() => this.UpdateCart("decrease")} className="sum-button">
                        -
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeQuantity