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
        }
    }

    OpenCart=()=>{
        this.props.openCart();
    }

    render() {
        return (
            <CartContext.Consumer>
                {({QuantityOfProducts,currencyKey,ChangeProductInCart,cachedData,productsPrices}) => (
                    <div>
                        <div className="basket-container"
                             onClick={()=>this.OpenCart()}>
                            <img className="basket" src={icon} alt={"basket"}/>
                            <div className="circle">
                                <span className="circle-value">{QuantityOfProducts()}</span>
                            </div>
                        </div>
                        {this.props.showCartOverlay && (
                            <div>

                                <div className="cart-overlay">
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
                                        priceSymbol={cachedData?.map((value) => value.prices[currencyKey].currency.symbol)}
                                        currencyKey={currencyKey}
                                        prices={cachedData?.map((value, key) => value.length * value.prices[currencyKey]?.amount)}
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