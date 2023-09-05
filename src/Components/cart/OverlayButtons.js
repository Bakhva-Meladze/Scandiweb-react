import React from "react";
import { useHistory } from 'react-router-dom';


class OverlayButtons extends React.Component {



    render() {
        return (
            <div>
                <button className={"overflow-button-wiev"}
                        onClick={() =>  window.location.pathname = "/Cart"}>
                    <span className="overflow-value">VIEW BAG</span>
                </button>
                <button className="overflow-button-checkout"
                        onClick={() => this.props.cart(false)}>
                    <span className="overflow-value-checkout">CHECK OUT</span>
                </button>
            </div>
        )
    }
}

export default OverlayButtons