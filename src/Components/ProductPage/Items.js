import React from "react";

class Items extends React.Component {
    render() {
        return (
            <div className="items">
                {this.props.items.map(item => (
                    <div className={`${this.props.choseItemId === item.id ? "item color" : "item"}`} key={item.id}
                         onClick={() => this.props.addSelectItem(item.id)}>
                        <p className="value">{item.value}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Items