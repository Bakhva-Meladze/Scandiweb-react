import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.sumPrices();
    }

    sumPrices() {
        return this.props.prices
            ? parseInt(this.props.prices?.reduce((one, two) => {
                return one + two
            }, 0)).toFixed(2)
            : 0;
    }



    render() {
        return (
            <div className="foot">
                <div className="overflow-tax">
                    {"Total:"}
                    <span className="currency">
                        {this.props.pricesAttributes[this.props.currencyKey].currency.symbol}
                        {this.sumPrices()}
                    </span>
                </div>
            </div>
        )
    }
}

export default Summary