import React from "react";

class Items extends React.Component {
    render() {
        return(
            <div className="content-overlay">
            <span className="brand-overlay">{this.props.brand}</span>
            <span className="name-overlay">{this.props.name}</span>
            <div className="currency-overlay">
                {this.props.currency[this.props.currencyKey]?.currency.symbol}
                {this.props.currency[this.props.currencyKey]?.amount}
            </div>
            <div className= "attribute-overlay">
                  {/*  <span
                        className="size-overlay">
                        {this.props.productAttributes[0]?.id ? this.props.productAttributes.items[0] + ":" : ''}
                    </span>*/}
                <div className="items-overlay">
                    {this.props.productAttributes.map((item, key) => (
                        <div className={this.props.chooseItemID === item.id ? "item-overlay color" : "item-overlay"}
                             key={item.id}>
                                   <span
                                       className="value-overlay" >
                                        {item.value}
                                   </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>)
    }
}


export default Items