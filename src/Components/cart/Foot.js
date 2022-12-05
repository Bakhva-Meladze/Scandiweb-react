import React from 'react';


class Foot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: this.props.prices,
            sum: null,

        }
        this.sumPrices();
        this.parcentOfSumPraces();
        this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    }
    sumPrices(){
        return parseInt(this.props.prices.reduce((one,two)=>{
            return one+two
        },0)).toFixed(2)
    }
    parcentOfSumPraces(){
        return this.sumPrices() * 21/100

    }
    deleteLocalStorage(){
        localStorage.removeItem("id");
        this.setState({
            id: this.state.id
        })

    }
    render() {
        return(
            <div className="foot">
                <div className="tax">
                    <span className="all-items">Tax 21%:</span>
                    <span className="currency">
                        {this.props.currency[this.props.showCurrenykey].currency.symbol}
                        {this.parcentOfSumPraces()}
                    </span>
                </div>
                <div className="quantity">
                    <span>Quantity:</span>
                    <span className="currency">{this.props.sumQuantity}</span>
                </div>
                <div className={`${this.props.dataFromHeader? "overflow-tax":"tax"}`}>
                    <span className={`${this.props.dataFromHeader? "overflow-total":""}`}>
                        {this.props.dataFromHeader ?"Total":"Total:"}
                    </span>
                    <span className="currency">
                        {this.props.currency[this.props.showCurrenykey].currency.symbol}
                        {this.sumPrices()}
                    </span>
                </div>
                <button className="button" onClick={()=> this.deleteLocalStorage()}><span>ORDER</span></button>
            </div>
        )
    }
}

export default Foot