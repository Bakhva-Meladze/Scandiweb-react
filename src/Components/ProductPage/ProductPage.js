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
            choseItemId: '',
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
            choseSelectId:[],
            addButton: false
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
            this.setState({
                product: responseData.data.product,
                img: responseData.data.product.gallery,
                attributes:  responseData.data.product.attributes,
                rendered: true,
                description: responseData.data.product.description,
                size: responseData.id,
                currencySymbol: responseData.data.product.prices,
                filter:false
            });
        }).catch(Error => {
            this.setState({error: 'Network response of ProductPage is not ok ' + Error})
        });
    }

    addSelectItem=(selectedAttributes, count)=>{
        console.log(selectedAttributes);
            this.setState({
                selectedAttributes,
                addButton: true
            })

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
                                        onClick={() => this.state.addButton?
                                            AddProductInCart(this.state.product,this.state.selectedAttributes):
                                            alert("please select one of these options")}>
                                    {this.state.product.inStock?"Add Cart":"OUT OF STOCK"}
                                </button>
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
