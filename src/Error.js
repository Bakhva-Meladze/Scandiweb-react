import React from 'react';


class Error extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <h1 style={{color:"red"}}>{this.props.propError}</h1>
        )

    }
}

export default Error