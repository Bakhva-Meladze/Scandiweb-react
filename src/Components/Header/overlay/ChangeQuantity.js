import React from "react";

class ChangeQuantity extends React.Component {
    UpdateCart = (type) => {
        this.props.ChangeProductInCart(type, this.props.index);
    }

    render() {
        return (<div className="quantity-switcher-overflow">
                <div className="sum-overflow">
                    <div onClick={() => this.UpdateCart("increase")} className="sum-button">
                        +
                    </div>
                    <span style={{textAlign: "center"}}>
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