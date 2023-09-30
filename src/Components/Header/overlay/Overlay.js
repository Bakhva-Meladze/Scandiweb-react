import React from "react";
import icon from '../../../images/emptyCart.svg';
import CartContext from "../../cart/CartContext";
import Items from "./Items";
import ChangeQuantity from "./ChangeQuantity";
import ImageSlider from "./ImageSlider";
import Summary from "./Summary";
import OverlayButtons from "./OverlayButtons";
class Overlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCartOverlay: false,
        }
    }

    OpenCart=(event,element)=>{
        if(element === "basket"){
            alert("overlay");
            this.setState({
                showCartOverlay: true

            })
        }

        if(element === "overlay"){
            alert("overlay");
            this.setState({
                showCartOverlay: false

            })
        }

        if( event.target.className === "overflow-button-checkout" && element ==="checkout"){
            alert("checkout");
            this.setState({
                showCartOverlay: false

            })
        }
        if(event.target.className ==="cart-overlay" && element === "cart-overlay"){
            alert("cart-overlay");
            this.setState({
                showCartOverlay: true

            })

        }
    }

    render() {
        return (
            <CartContext.Consumer>
                {({QuantityOfProducts,currencyKey,ChangeProductInCart,cachedData,productsPrices}) => (
                    <div>
                        <div className="basket-container"
                             onClick={(event)=>this.OpenCart(event, "basket")}>
                            <img className="basket" src={icon} alt={"basket"}/>
                            <div className="circle">
                                <span className="circle-value">{QuantityOfProducts()}</span>
                            </div>
                        </div>
                        {this.state.showCartOverlay && (
                            <div>
                                <div className="overlay"
                                     onClick={(event)=>this.OpenCart(event,"overlay")}></div>
                                <div className="cart-overlay"
                                     onClick={(event) => this.OpenCart(event,"cart-overlay")}>
                                    <div className="title">
                                        <span className="brand">{"My Bag  ,"}</span>
                                        <span className="items">{QuantityOfProducts()} items</span>
                                        :
                                        <span>CART</span>
                                    </div>
                                    {cachedData?.map((product,index)=>(
                                        <div key={index} className="container-overflow-item">
                                            <Items
                                                chooseItemID={product.choseItemID}
                                                brand={product.brand}
                                                name={product.name}
                                                currency={product.prices}
                                                productAttributes={product.items}
                                                currencyKey={currencyKey}
                                            />
                                            <div className="content-right-overflow">
                                                <ChangeQuantity
                                                    ChangeProductInCart={ChangeProductInCart}
                                                    productQuantity={product.length}
                                                    index={index}
                                                />
                                                <ImageSlider
                                                    images={product.gallery}
                                                    myKey={index}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Summary
                                        symbol={productsPrices}
                                        currencyKey={currencyKey}
                                        prices={cachedData?.map((value, key) => value.length * productsPrices[key]?.amount)}
                                        QuantityOfProducts={QuantityOfProducts()}
                                    />
                                    <OverlayButtons close={this.OpenCart} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Overlay