import React from "react";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.addressRouter = this.addressRouter.bind(this);
    }

    addressRouter(category) {
        window.location.pathname = "category/" + category;
    }

    render() {
        return (
            <div className="navigation">
                {this.props.categories.map((value, key) => (
                    <label key={key} className="btn">
                        <button className="btns" onClick={() => this.addressRouter(this.props.categories[key].name)}>
                            {this.props.categories[key].name}
                        </button>
                    </label>
                ))}
            </div>
        )
    }
}

export default Category