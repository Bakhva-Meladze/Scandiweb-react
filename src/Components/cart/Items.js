import React from 'react';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsItem: this.props.productAttributes,
        }
    }

    render() {
        return (
            <div className={`${this.props.dataFromHeader ? "content-overlay" : "content"}`}>
                <span className={`${this.props.dataFromHeader ? "brand-overlay" : "brand"}`}>{this.props.brand}</span>
                <span className={`${this.props.dataFromHeader ? "name-overlay" : "name"}`}>{this.props.name}</span>
                <div className={`${this.props.dataFromHeader ? "currency-overlay" : "currency"}`}>
                    {this.props.currency[this.props.currencyKey]?.currency.symbol}
                    {this.props.currency[this.props.currencyKey]?.amount}
                </div>
                <div className="attribute">
                    <span
                        className="size">
                        {this.props.productAttributes[0]?.id ? this.props.productAttributes[0]?.id + ":" : ''}
                    </span>
                    <div className="items">
                        {this.props.productAttributes[0]?.items.map((item, key) => (
                            <div className={this.props.chooseItemID === item.id ? "item color" : "item"}
                                 key={item.id}>
                                   <span
                                       className={"value"}>
                                        {item.value}
                                   </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Items