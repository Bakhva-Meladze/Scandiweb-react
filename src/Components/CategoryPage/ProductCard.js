import React from "react";
import cartIcon from "../../images/whiteCart.svg";
import {Link} from "react-router-dom";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }
    componentDidMount() {
        this.props.productCategory.attributes.map((attributes)=>(
            this.setState({
                [attributes.id]:0
            })
        ))
    }
    render() {
        return (
            <div className="product-card">
                <span className={`${this.props.productCategory.inStock === true ? "hide" : "value-stock"}`}>
                    {"OUT OF THE STOCK"}
                </span>
                <Link to={`/product/${this.props.productCategory.id}`} >
                    <img className={`${this.props.productCategory.inStock === true ? "pictures" : "out-stock"}`}
                         src={this.props.productCategory.gallery[0]}
                         alt="Product"/>
                </Link>
                <div className="container-data">
                    <div className="name"><span>{this.props.productCategory.name}</span>
                        <div className='currency'>
                            {this.props.productCategory.prices[this.props.currencyKey]?.currency.symbol}
                            {this.props.productCategory.prices[this.props.currencyKey]?.amount}
                        </div>
                    </div>
                    {this.props.productCategory.inStock?
                        <div className="basket-img">
                            <img className="img-value"
                                 onClick={() => this.props.AddProductInCart
                                 (
                                     this.props.productCategory,
                                     this.state
                                 )}
                                 src={cartIcon} alt="Cart"/>
                        </div>:""
                    }
                </div>
            </div>
        )
    }
}

export default ProductCard
