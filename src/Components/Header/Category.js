import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.addressRouter = this.addressRouter.bind(this);
    }

    addressRouter(category) {

        /*
                window.location.pathname = "category/" + category;
        */
        this.props.testType(category);

    }

    render() {
        return (
            <div className="navigation">
                {this.props.categories.map((value, key) => (
                    <label key={key} className="btn">
                        {/*<button className="btns" onClick={() => this.props.testType(this.props.categories[key].name)}>
                            {this.props.categories[key].name}
                        </button>*/}
                        <NavLink className="btns" onClick={() => this.props.testType(this.props.categories[key].name)}
                                 key={this.props.categories[key].name} to={"/category/" + this.props.categories[key].name}>
                            {this.props.categories[key].name}
                        </NavLink>
                    </label>
                ))}
            </div>
        )
    }
}

export default Category