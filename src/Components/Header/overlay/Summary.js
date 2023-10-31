import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencySymbol: this.props.currencySymbol,
        }

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
            <div className="summary">
                <div className="overlay-tax">
                    Total:
                    <span className="currency">
                        {this.state.currencySymbol}
                        {this.sumPrices()}
                    </span>
                </div>
            </div>
        )
    }
}

export default Summary