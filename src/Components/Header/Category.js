import React from "react";
import {NavLink} from "react-router-dom";

class Category extends React.Component {
    render() {
        return (
            <div className="navigation">
                {this.props.categories.map((category, key) => (
                    <label key={key} className="btn">
                        <NavLink className="btns"
                                 key={category.name}
                                 to={"/category/"+category.name}>
                            {category.name}
                        </NavLink>
                    </label>
                ))}
            </div>
        )
    }
}

export default Category