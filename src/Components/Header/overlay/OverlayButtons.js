import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class OverlayButtons extends React.Component {
    render() {
        return (
            <div>
                <Link to={"/cart"}>
                    <button className="overlay-button-view">
                        <span className="overflow-value">VIEW BAG</span>
                    </button>
                </Link>
                <button className="overlay-button-checkout"
                        onClick={() => this.props.close()}>
                    CHECKOUT
                </button>
            </div>
        )
    }
}

export default withRouter(OverlayButtons)