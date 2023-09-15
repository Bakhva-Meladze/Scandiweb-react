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
        this.OpenCart = this.OpenCart.bind(this);
    }

    OpenCart() {
        this.setState({
            showCartOverlay: !this.state.showCartOverlay
        })
    }

    render() {
        return (
            <CartContext.Consumer>
                {({QuantityOfProducts,listOfCartProducts,currencyKey,
                      ChangeProductInCart,pricesAttributes,cachedData,productsPrices}) => (
                    <div>
                        <div className="basket-container"
                             onClick={() => this.OpenCart()}>
                            <img className="basket" src={icon} alt={"basket"}/>
                            <div className="circle">
                                <span className="circle-value">{QuantityOfProducts()}</span>
                            </div>
                        </div>
                        {this.state.showCartOverlay && (
                            <div className="overlay">
                                <div className="cart-overlay">
                                    <div className="title">
                                        <span className="brand">{"My Bag  ,"}</span>
                                        <span className="items">{QuantityOfProducts()} items</span>
                                        :
                                        <span>CART</span>
                                    </div>
                                    {listOfCartProducts.map((product,index)=>(
                                        <div key={index} className="container-overflow-item">
                                            <Items
                                                chooseItemID={product.chooseItemID}
                                                brand={product.brand}
                                                name={product.name}
                                                currency={product.prices}
                                                productAttributes={product.attributes}
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
                                        pricesAttributes={pricesAttributes}
                                        currencyKey={currencyKey}
                                        prices={cachedData?.map((value, key) => value.length * productsPrices[key])}
                                        QuantityOfProducts={QuantityOfProducts()}
                                    />
                                    <OverlayButtons />
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