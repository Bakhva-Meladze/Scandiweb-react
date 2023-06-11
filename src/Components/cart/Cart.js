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
                      currencyKey, QuantityOfProducts
                  }) => (
                    <div>
                        <div>
                            <div className={`${this.props.dataFromHeader ? "cart-overlay" : "cart"}`}>
                                <div className="title">
                                    {this.props.dataFromHeader ?
                                        <>
                                            <span className="brand">{"My Bag  ,"}</span>
                                            <span className="items">{QuantityOfProducts()} items</span>
                                        </> :
                                        <span>CART</span>
                                    }
                                </div>
                                {listOfCartProducts?.map((product, index) => (
                                    <div
                                        className={`${this.props.dataFromHeader ? "container-overflow-item" : "container-item"}`}
                                        key={index}>
                                        <Items
                                            dataFromHeader={this.props.dataFromHeader}
                                            chooseItemID={product.chooseItemID}
                                            brand={product.brand}
                                            name={product.name}
                                            currency={product.prices}
                                            productAttributes={product.attributes}
                                            currencyKey={currencyKey}
                                        />
                                        <div
                                            className={`${this.props.dataFromHeader ? "content-right-overflow" : "content-right"}`}>
                                            <ChangeQuantity
                                                dataFromHeader={this.props.dataFromHeader}
                                                ChangeProductInCart={ChangeProductInCart}
                                                productQuantity={product.length}
                                                index={index}
                                            />
                                            <ImageSlider
                                                dataFromHeader={this.props.dataFromHeader}
                                                images={product.gallery}
                                                myKey={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Summary
                                    dataFromHeader={this.props.dataFromHeader}
                                    pricesAttributes={pricesAttributes}
                                    currencyKey={currencyKey}
                                    prices={cachedData?.map((value, key) => value.length * productsPrices[key])}
                                    QuantityOfProducts={QuantityOfProducts()}
                                />
                                {this.props.dataFromHeader ? <OverlayButtons cart={this.props.cart}/> : null}
                            </div>
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart
