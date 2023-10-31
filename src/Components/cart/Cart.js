import React from "react";
import ImageSlider from "./ImageSlider";
import Items from "./Items"
import Summary from "./Summary"
import ChangeQuantity from "./ChangeQuantity";
import CartContext from "./CartContext";

class Cart extends React.Component {
    render() {
        return (
            <CartContext.Consumer>
                {({cachedData, ChangeProductInCart, currencyKey, QuantityOfProducts}) => (
                    <div>
                        <div>
                            <div className="cart">
                                {cachedData?.map((product, index) => (
                                    <div className="container-item"
                                         key={index}>
                                        <Items
                                            chooseItemID={product.choseItemID}
                                            brand={product.brand}
                                            name={product.name}
                                            currency={product.prices}
                                            productAttributes={product.items}
                                            currencyKey={currencyKey}
                                        />
                                        <div
                                            className="content-right">
                                            <ChangeQuantity
                                                ChangeProductInCart={ChangeProductInCart}
                                                productQuantity={product.length}
                                                index={index}
                                            />
                                            <ImageSlider
                                                images={product.gallery}
                                                imageKey={index}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Summary
                                    currecnySymbol={cachedData[0]?.prices[currencyKey].currency.symbol}
                                    currencyKey={currencyKey}
                                    prices={cachedData?.map((value) => value.length * value.prices[currencyKey]?.amount)}
                                    QuantityOfProducts={QuantityOfProducts()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default Cart
