import React from "react";
import CartContext from "./Components/cart/CartContext";


class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state ={

        }
    }

    componentDidMount() {

    }
      changeUrl = () => {

    }

    render() {
        const {changeUrl} =this;

        return(
            <CartContext.Provider value={{changeUrl}}>
                {this.props.children}
            </CartContext.Provider>)
    }
}

FetchData.contextType = CartContext;


export default FetchData