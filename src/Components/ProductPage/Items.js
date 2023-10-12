import React, {useRef} from "react";

class Items extends React.Component {

    constructor(props) {
        super(props);
        /*this.ref = this.props.attributes.map(() => React.createRef());*/
        this.state = {

        };





    }

    addSelectItem = (selectedAttributes, count) => {
        this.setState({
                [count]: selectedAttributes
            }, () => {
                this.props.addSelectItem(this.state);
            }
        );

       /* this.setState({count: this.state.count + 1}, () => {
            console.log(this.state.count);
        });

        console.log(this.state);
        this.props.addSelectItem(this.state);*/
        /*const divValue = this.ref.current.textContent;
        console.log(divValue);*/


    }



    render() {
        return (
            <div>
                {this.props.attributes?.map((attributes,key)=> (
                    <div key={key}>
                     <p key={key} className="size">{attributes.id}</p>
                        <div className="items">
                            {attributes.items.map((item,index) =>(
                                attributes.id === "Color"?
                                    <div style={{background:`${item.id}`}}

                                         className={`${item.id === this.state[key]?"select-color item":"item"}`}
                                         key={item.id}
                                         onClick={() => this.addSelectItem(item.id,key)}>
                                    </div>
                                    :
                                    <div className={`${index === this.state[attributes.id]?"color item":"item"}`}
                                         key={item.id}
                                         onClick={() => this.addSelectItem(index,this.props.attributes[key].id)}>
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