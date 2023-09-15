import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.sumPrices();
        this.parcentOfSumPraces();
        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    }

    sumPrices() {
        return this.props.prices
            ? parseInt(this.props.prices?.reduce((one, two) => {
                return one + two
            }, 0)).toFixed(2)
            : 0;
    }

    parcentOfSumPraces() {
        return this.sumPrices() * 21 / 100;

    }

    deleteLocalStorage() {
        localStorage.removeItem("cartProducts");
    }

    render() {
        return (
            <div className="foot">
                <div className="tax">
                    <span className="all-items">Tax 21%:</span>
                    <span className="currency">
                        {this.props.pricesAttributes[this.props.currencyKey]?.currency.symbol}
                        {this.parcentOfSumPraces()}
                    </span>
                </div>
                <div className="quantity">
                    <span>Quantity:</span>
                    <span className="currency">{this.props.QuantityOfProducts}</span>
                </div>
                <div className={`${this.props.dataFromHeader ? "overflow-tax" : "total"}`}>
                    {"Total:"}
                    <span className="currency">
                        {this.props.pricesAttributes[this.props.currencyKey]?.currency.symbol}
                        {this.sumPrices()}
                    </span>
                </div>
                <button className="button" onClick={() => this.deleteLocalStorage()}><span>ORDER</span></button>
            </div>
        )
    }
}

export default Summary