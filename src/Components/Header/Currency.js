import React from "react";
import arrowUp from "../../images/arrowUp.svg";

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCurrencyList: false,
        }
    }

    openCurrencyList() {
        this.setState({
            showCurrencyList: !this.state.showCurrencyList
        });
    }

    render() {
        return (
            <>
                <div className="currency" onClick={() => this.openCurrencyList()}>
                    <h3 className='dollar'>{this.props.currency[this.props.currencyKey]?.currency.symbol}</h3>
                    <div
                        className={this.state.showCurrencyList ? "container" : "hide"}>
                        {this.props.currency.map((value, key) => (
                            <div key={key}>
                                <button onClick={() => this.props.SelectCurrency(key)}
                                        className="sectionCurrency">
                                    {this.props.currency[key].currency.symbol} {this.props.currency[key].currency.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div onClick={() => this.openCurrencyList()}>
                    <img className={this.state.showCurrencyList ? "arrow" : "arrow flip-arrow"} src={arrowUp}
                         alt={"arrow"}/>
                </div>
            </>
        )
    }
}

export default Currency