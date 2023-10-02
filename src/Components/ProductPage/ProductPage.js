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
            product: [],
            choseItemId: "",
            id: window.location.pathname.split("/")[2],
            description: '',
            attributes: [],
            error: "",
            size: "",
            currencySymbol: [],
            currencyAmount: [],
            img: [],
            filter: true,
            key: null,
            choseSelectId:[]
        }
    }

    async componentDidMount() {

        const responseOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                query: this.context.queryOfProduct(this.state.id)
            })
        }

        fetch(url, responseOptions).then(response => response.json()).then(responseData => {
            console.log(responseData);
            this.setState({
                product: responseData.data.product,
                img: responseData.data.product.gallery,
                attributes:  responseData.data.product.attributes,
                rendered: true,
                description: responseData.data.product.description,
                size: responseData.data.product.attributes[0].id,
                currencySymbol: responseData.data.product.prices,
                filter:false
            });
        }).catch(Error => {
            this.setState({error: 'Network response of ProductPage is not ok ' + Error})
        });
    }

    addSelectItem = (count,key) => {
        this.state.attributes.length >1? this.setState(PrevState=>({
                choseSelectId: [...PrevState.choseSelectId ,{ id:key, name: count }]
            }))
            :
        this.setState({
            choseSelectId:{ id:key, name: count },
            key:key
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
        console.log(this.state.product.inStock);
        return (
            <CartContext.Consumer>
                {({AddProductInCart, currencyKey}) => (
                    <div className="main-product">
                        {this.state.filter?<Loading />:null}

                        <Slider className="container-pic" img={this.state.img}/>
                        <div className="product-details">
                            <div>
                                <p className="brand">{this.state.product?.brand}</p>
                                <p className="name">{this.state.product?.name}</p>
                                <Items attributes={this.state.attributes}
                                       parameter={this.state.size}
                                       choseItemId={this.state.choseItemId}
                                       keyOfSelectedItem={this.state.choseSelectId}
                                       addSelectItem={this.addSelectItem}/>

                                <p className="price"> Price:</p>
                                <div className='currency'>
                                    {this.state.currencySymbol[currencyKey]?.currency.symbol}
                                    {this.state.currencySymbol[currencyKey]?.amount}
                                </div>
                                <button className={this.state.product.inStock?"buttonAdd":"outOfButton"}
                                        disabled={!this.state.product.inStock}
                                        onClick={() =>
                                            AddProductInCart(
                                                this.state.product.id,
                                                this.state.choseSelectId,
                                                this.state.product.gallery,
                                                this.state.product.prices,
                                                this.state.product.attributes[0]?.items,
                                                this.state.product.brand,
                                                this.state.product.name,
                                            )
                                        }>
                                    {this.state.product.inStock?"Add Cart":"OUT OF STOCK"}
                                </button>
                                    {/*: <button className="outOfButton" disabled={this.state.products.inStock}>OUT OF STOCK</button>}*/}

                                {parse(this.state.product.description ? this.state.product.description : "")}
                            </div>
                        </div>
                    </div>
                )}
            </CartContext.Consumer>
        )
    }
}

export default ProductPage
