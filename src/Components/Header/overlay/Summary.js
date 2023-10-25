import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            priceSymbol: this.props.priceSymbol !== undefined? this.props.priceSymbol: "$",
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
            <div className="foot">
                <div className="overflow-tax">
                    {"Total:"}
                    <span className="currency">
                        {this.state.priceSymbol}
                        {this.sumPrices()}
                    </span>
                </div>
            </div>
        )
    }
}

export default Summary