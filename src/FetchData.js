import React from "react";
import CartContext from "./Components/cart/CartContext";


class FetchData extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }
    render() {
        return(<div>
            {this.props.children}

        </div>)
    }
}

FetchData.contextType = CartContext;


export default FetchData