import React from "react";

class Items extends React.Component {
    render() {
        return (
            <div className="content-overlay">
                <span className="brand-overlay">{this.props.brand}</span>
                <span className="name-overlay">{this.props.name}</span>
                <div className="currency-overlay">
                    {this.props.currency[this.props.currencyKey]?.currency.symbol}
                    {this.props.currency[this.props.currencyKey]?.amount}
                </div>
                <div className="attribute-overlay">
                    {this.props.productAttributes?.map((attributes, key) => (
                        <div key={key} className="items-overlay">
                            <span
                                className="size-overlay">
                                    {attributes.id}
                            </span>
                            <div className="attribute-section" key={key}>
                                {
                                    attributes.items?.map((item, index) => (
                                        attributes.id === "Color" ?
                                            <div style={{background: `${item.value}`}}
                                                 className={`${this.props.chooseItemID?.[attributes.id] === index ?
                                                     "select-color item-overlay color" : "item-overlay color"}`}
                                                 key={item.id}>
                                                <p className="value-overlay">
                                                </p>
                                            </div>
                                            :
                                            <div key={index}
                                                 className={this.props.chooseItemID[attributes.id] === index ?
                                                     "item-overlay filter" : "item-overlay"}>
                                                <span className="value-overlay">{item.value}</span>
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>)
    }
}

export default Items