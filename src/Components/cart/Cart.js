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
                {({cachedData, ChangeProductInCart, currencyKey,QuantityOfProducts,openOverlay }) => (
                    <div>
                        <div>
                            <div className= "cart">
                                {cachedData?.map((product, index) => (
                                    <div className={`${openOverlay? "container-overflow-item" : "container-item"}`}
                                        key={index}>
                                        <Items
                                            dataFromHeader={openOverlay}
                                            chooseItemID={product.choseItemID}
                                            brand={product.brand}
                                            name={product.name}
                                            currency={product.prices}
                                            productAttributes={product.items}
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
                                    priceSymbol={cachedData?.map((value) => value.prices[currencyKey].currency.symbol)}
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
