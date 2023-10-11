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
            <div className="content">
                <span className="brand">{this.props.brand}</span>
                <span className="name">{this.props.name}</span>
                <div className="currency">
                    {this.props.currency[this.props.currencyKey]?.currency.symbol}
                    {this.props.currency[this.props.currencyKey]?.amount}
                </div>
                <div className="attribute">
                    {this.props.productAttributes?.map((attributes, key) => (
                        <div  key={key} className="items">
                            <span
                                className="size">
                                    {attributes.id}
                            </span>
                            <div  className="attribute-section" key={key}>
                                {
                                    attributes.items?.map((item,index) =>(
                                        attributes.id === "Color"?
                                            <div style={{background:`${item.id}`}} className="item color" key={item.id}>
                                                <p className="value"></p>
                                            </div>
                                            :
                                            <div key={index} className={this.props.chooseItemID[attributes.id] === index?"item filter": "item"}>
                                                <span>{item.value}</span>
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                   {/* <div className="items">
                        {this.props.productAttributes.map((item, key) => (
                            <div className={this.props.chooseItemID === item.id ? "item color" : "item"}
                                 key={item.id}>
                                   <span
                                       className={"value"}>
                                        {item.value}
                                   </span>
                            </div>
                        ))}
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default Items