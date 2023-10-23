import React from 'react';

class Items extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <span className="brand">{this.props.brand}</span>
                <span className="name">{this.props.name}</span>
                <div className="currency">
                    {this.props.currency[this.props.currencyKey]?.currency.symbol}
                    {this.props.currency[this.props.currencyKey]?.amount}
                </div>
                <div className="attribute">
                    {this.props.productAttributes?.map((attributes, key) => (
                        <div key={key} className="items">
                            <span
                                className="size">
                                    {attributes.id}
                            </span>
                            <div className="attribute-section" key={key}>{
                                attributes.items?.map((item, index) => (
                                    attributes.id === "Color" ?
                                        <div style={{background: `${item.id}`}}
                                            className = {`${this.props.chooseItemID?.[attributes.id] === index?
                                            "select-color item color" :"item color"}`}
                                             key={item.id}>
                                            <p className="value"></p>
                                        </div>
                                        :
                                        <div key={index}
                                             className={this.props.chooseItemID[attributes.id] === index ? "item filter" : "item"}>
                                            <span>{item.value}</span>
                                        </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Items