import React from "react";
import ImageSlider from "./ImageSlider";
import Items from "./Items"
import Summary from "./Summary"
import ChangeQuantity from "./ChangeQuantity";
import OverlayButtons from "./OverlayButtons";
import CartContext from "./CartContext";

class Cart extends React.Component {
    render() {
        return (
            <CartContext.Consumer>
                {({
                      cachedData, listOfCartProducts, productsPrices, pricesAttributes, ChangeProductInCart,
                      currencyKey, QuantityOfProducts,changeUrl,openOverlay
                  }) => (
                    <div>
                        <div>
                            <div className={`${openOverlay? "cart-overlay" : "cart"}`}>
                                {/*<div className="title">
                                    {openOverlay?
                                        <>
                                            <span className="brand">{"My Bag  ,"}</span>
                                            <span className="items">{QuantityOfProducts()} items</span>
                                        </> :
                                        <span>CART</span>
                                    }
                                </div>*/}
                                {listOfCartProducts?.map((product, index) => (
                                    <div
                                        className={`${openOverlay? "container-overflow-item" : "container-item"}`}
                                        key={index}>
                                        <Items
                                            dataFromHeader={openOverlay}
                                            chooseItemID={product.chooseItemID}
                                            brand={product.brand}
                                            name={product.name}
                                            currency={product.prices}
                                            productAttributes={product.attributes}
                                            currencyKey={currencyKey}
                                        />
                                        <div
                                            className={`${openOverlay? "content-right-overflow" : "content-right"}`}>
                                            <ChangeQuantity
                                                dataFromHeader={openOverlay}
                                                ChangeProductInCart={ChangeProductInCart}
                                                productQuantity={product.length}
                                                index={index}
                                            />
                                            <ImageSlider
                                                dataFromHeader={openOverlay}
                                                images={product.gallery}
                                                myKey={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Summary
                                    dataFromHeader={openOverlay}
                                    pricesAttributes={pricesAttributes}
                                    currencyKey={currencyKey}
                                    prices={cachedData?.map((value, key) => value.length * productsPrices[key])}
                                    QuantityOfProducts={QuantityOfProducts()}
                                />
                                {openOverlay?
                                    <OverlayButtons changeUrl={changeUrl}
                                                    cart={this.props.cart}/> : null}
                            </div>
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart
