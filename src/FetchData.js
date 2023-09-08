import React from "react";
import CartContext from "./Components/cart/CartContext";
import { useHistory } from 'react-router-dom';

class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            url: ""

        }
        window.addEventListener('popstate',()=>console.log("I am a"+ window.location.pathname));

    }

    componentDidMount() {
        // window.location.pathname

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(window.location.pathname !== this.state.url){
            window.history.pushState({}, '', this.state.url);

        }
    }

    changeUrl = (event) => {


        event.preventDefault();
          this.setState({
              url: "Cart"
          });
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