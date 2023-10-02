import React from "react";

class Items extends React.Component {
    render() {
        console.log(this.props.keyOfSelectedItem[0]?.id);

         return (
            <div>
                {this.props.attributes.map((value,key)=> (

                    <div key={key}>
                        {key}
                    <p key={key} className="size">{value.id}</p>
                        <div className="items">
                            {value.items.map((item,index) =>(
                                value.id === "Color"?
                                    <div style={{background:`${item.id}`}} className="item" key={item.id}
                                         onClick={() => this.props.addSelectItem(item.id,key)}>
                                        <p className="value"></p>
                                    </div>
                                    :
                                    <div className={`${this.props.keyOfSelectedItem[key]?.id === item.id &&
                                        this.props.keyOfSelectedItem[key]?.name === index?"color item":"item"}`} key={item.id}
                                         onClick={() => this.props.addSelectItem(item.id,index)}>
                                        {index}
                                        <p className="value">{item.value}</p>
                                    </div>
                            ))}
                        </div>

                    </div>


                    /*this.props.attributes[key].map(item => (
                            this.props.parameter === "Size"?
                                /!*<div style={{background: `${item.id}`}} className="item" key={item.id}
                                     onClick={() => this.props.addSelectItem(item.id)}>
                                    <p className="value"></p>
                                </div>*!/
                                <div className={`${this.props.choseItemId === item.id ? "item color" : "item"}`} key={item.id}
                                     onClick={() => this.props.addSelectItem(item.id)}>
                                    <p className="value">{item.value}</p>
                                </div>:
                                <div style={{background: `${item.id}`}} className="item" key={item.id}
                                     onClick={() => this.props.addSelectItem(item.id)}>
                                    <p className="value"></p>
                                </div>
                        ))*/

                    ))
                }


            </div>
        )
    }
}

export default Items