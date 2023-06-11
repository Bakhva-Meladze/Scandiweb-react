import React from "react";

class ChangeQuantity extends React.Component {
    UpdateCart = (type) => {
        this.props.ChangeProductInCart(type, this.props.index);
    }

    render() {
        return (<div className={`${this.props.dataFromHeader ? "quantity-switcher-overflow" : "quantity-switcher"}`}>
                <div className={`${this.props.dataFromHeader ? "sum-overflow" : "sum"}`}>
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