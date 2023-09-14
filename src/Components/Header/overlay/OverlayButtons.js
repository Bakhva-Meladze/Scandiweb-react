import React from "react";
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {useCart} from "../../../useContext";


class OverlayButtons extends React.Component {

    /*goToCartPage = () => {
        this.props.history.push("/Cart");
        this.toggleOverlay();
    };*/
    handleAddToCart = () => {
        alert("hi");
        this.props.history.push("/cart");
        this.toggleOverlay();
         useCart(); // Access the addToCart function from the context

    };



    render() {
        return (
            <div>
                <button className={"overflow-button-wiev"}
                        onClick={this.props.changeUrl}>
                    <span className="overflow-value">VIEW BAG</span>
                </button>
                <button className="overflow-button-checkout"
                        onClick={() => this.props.cart(false)}>
                    <span className="overflow-value-checkout">CHECK OUT</span>
                </button>
            </div>
        )
    }

    toggleOverlay() {

    }
}

export default withRouter(OverlayButtons)