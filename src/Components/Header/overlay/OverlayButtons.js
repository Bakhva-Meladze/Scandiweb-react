import React from "react";
import {Link, useHistory} from 'react-router-dom';
import { withRouter } from "react-router-dom";


class OverlayButtons extends React.Component {

    render() {
        return (
            <div>
                <Link  to={"/cart"}>
                    <button className="overflow-button-wiev">
                    <span className="overflow-value">VIEW BAG</span>
                </button>
                </Link>
                <button className="overflow-button-checkout"
                        onClick={() => this.props.close()}>
                    CHECK OUT
                </button>
            </div>
        )
    }
}

export default withRouter(OverlayButtons)