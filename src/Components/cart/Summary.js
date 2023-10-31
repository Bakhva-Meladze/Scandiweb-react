import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.sumPrices();
        this.taxQuantity();
    }

    sumPrices() {
        return this.props.prices
            ? parseInt(this.props.prices?.reduce((one, two) => {
                return one + two
            }, 0)).toFixed(2)
            : 0;
    }

    taxQuantity() {
        return this.sumPrices() * 21 / 100;

    }

    render() {
        return (
            <div className="cart-summary">
                <div className="tax">
                    <span className="all-items">Tax 21%:</span>
                    <span className="currency">
                        {this.taxQuantity()}
                        {" " + this.props.currecnySymbol}
                    </span>
                </div>
                <div className="quantity">
                    <span>Quantity:</span>
                    <span className="currency">{this.props.QuantityOfProducts}</span>
                </div>
                <div className="total">
                    {"Total:"}
                    <span className="currency">
                        {this.sumPrices()}
                        {" " + this.props.currecnySymbol}
                    </span>
                </div>
                <button className="button" onClick={() => {
                }}><span>ORDER</span></button>
            </div>
        )
    }
}

export default Summary