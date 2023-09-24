import React from "react";
import url from "../../url";
import parse from "html-react-parser";
import Slider from "./Slider";
import Items from "./Items";
import Error from "../../Error";
import CartContext from "../cart/CartContext"
import Loading from "../../Loading";

class ProductPage extends React.Component {
    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            choseItemId: "",
            id: window.location.pathname.split("/")[2],
            description: '',
            items: [],
            error: "",
            size: "",
            currencySymbol: [],
            currencyAmount: [],
            img: [],
            filter: true
        }
    }

    async componentDidMount() {
        /*const classProduct = await new ProductQueryClass();*/
        const responseOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.queryOfProduct(this.state.id)
            })
        }

        fetch(url, responseOptions).then(response => response.json()).then(responseData => {
            this.setState({
                products: responseData.data.product,
                img: responseData.data.product.gallery,
                items: !responseData.data.product.attributes[0] ? [] : responseData.data.product.attributes[0].items,
                rendered: true,
                description: responseData.data.product.description,
                size: !responseData.data.product.attributes[0] ? [] : responseData.data.product.attributes[0].id + ":",
                currencySymbol: responseData.data.product.prices,
                filter:false
            });
        }).catch(Error => {
            this.setState({error: 'Network response of ProductPage is not ok ' + Error})
        });
    }

    addSelectItem = (count) => {
        this.setState({
            choseItemId: count
        });
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <Error propError={this.state.error.toString()}/>
                </div>
            )
        }
        return (
            <CartContext.Consumer>
                {({AddProductInCart, currencyKey,productCategory}) => (
                    <div className="main-product">
                        {this.state.filter?<Loading />:null}

                        <Slider className="container-pic" img={this.state.img}/>
                        <div className="product-details">
                            <div>
                                <p className="brand">{this.state.products?.brand}</p>
                                <p className="name">{this.state.products?.name}</p>
                                <p className="size">{this.state.size}</p>
                                <Items items={this.state.items}
                                       choseItemId={this.state.choseItemId}
                                       addSelectItem={this.addSelectItem}/>
                                <p className="price"> Price:</p>
                                <div className='currency'>
                                    {this.state.currencySymbol[currencyKey]?.currency.symbol}
                                    {this.state.currencySymbol[currencyKey]?.amount}
                                </div>
                                <button
                                    className="button"
                                    onClick={() =>
                                        AddProductInCart(
                                        this.state.products.id,
                                        this.state.products.attributes[0]?.items[0]?.id,
                                        this.state.products.gallery,
                                        this.state.products.prices,
                                        this.state.products.attributes[0]?.items,
                                        this.state.products.brand,
                                        this.state.products.name,
                                        )

                                }>
                                    Add Cart
                                </button>
                                {parse(this.state.products.description ? this.state.products.description : "")}
                            </div>
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default ProductPage
