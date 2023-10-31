import React from "react";

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    addSelectItem = (id, items) => {
        this.setState({
                [id]: items
            }, () => {
                this.props.addSelectItem(this.state);
            }
        );
    }

    render() {
        return (
            <div>
                {this.props.itemAttributes?.map((attributes, key) => (
                    <div key={key}>
                        <p key={key} className="size">{attributes.id}</p>
                        <div className="items">
                            {attributes.items?.map((item, index) => (
                                attributes.id === "Color" ?
                                    <div style={{background: `${item.id}`}}
                                         className={`${index === this.state[attributes.id] ? "color select-color item" : "item"}`}
                                         key={item.id}
                                         onClick={() => this.addSelectItem(attributes.id, index)}>
                                    </div>
                                    :
                                    <div className={`${index === this.state[attributes.id] ? "color item" : "item"}`}
                                         key={item.id}
                                         onClick={() => this.addSelectItem(this.props.itemAttributes[key].id, index)}>
                                        <p className="value">{item.value}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }
}

export default Items