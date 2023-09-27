import React from "react";
import cartIcon from "../../images/whiteCart.svg";
import {Link} from "react-router-dom";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.ProductPage = this.ProductPage.bind(this);
    }

    ProductPage() {
        window.location.pathname = "/product/" + this.props.productCategory.id;

    }

    render() {
        return (
            <div className="product-card">
                <span style={{display: this.props.productCategory.inStock === true ? "none" : "block"}}
                      className={`${this.props.productCategory.inStock === true ? "" : "value-stock"}`}>
                    {"OUT OF THE STOCK"}
                </span>
                <Link to={`/product/${this.props.productCategory.id}`} >
                    <img className={`${this.props.productCategory.inStock === true ? "pictures" : "out-stock"}`}
                         src={this.props.productCategory.gallery[0]}
                         alt="Product"
                    />
                </Link>
                <div className="basket-img">
                    <img className="img-value"
                         onClick={() => !this.props.productCategory.inStock ? ""
                             : this.props.AddProductInCart(
                                 this.props.productCategory.id,
                                 this.props.productCategory.attributes[0]?.items[0]?.id,
                                 this.props.productCategory.gallery,
                                 this.props.productCategory.prices,
                                 this.props.productCategory.attributes[0]?.items,
                                 this.props.productCategory.brand,
                                 this.props.productCategory.name,
                             )}
                         src={cartIcon} alt="Cart"/>
                </div>
                <div className="name"><span>{this.props.productCategory.name}</span>
                    <div className='currency'>
                        {this.props.productCategory.prices[this.props.currencyKey]?.currency.symbol}
                        {this.props.productCategory.prices[this.props.currencyKey]?.amount}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard
