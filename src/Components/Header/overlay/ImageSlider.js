import React from 'react';

class ImageSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyOfImages: 0
        }
    }

    GoTheImage(arrow) {

        if (this.state.keyOfImages < this.props.images.length && this.state.keyOfImages >= 0) {
            arrow === "left" ?
                this.setState({
                    keyOfImages: this.state.keyOfImages === 0 ? this.props.images.length - 1 : this.state.keyOfImages - 1
                }) : this.setState({
                    keyOfImages: this.state.keyOfImages === this.props.images.length - 1 ? 0 : this.state.keyOfImages + 1
                })

        }
    }

    render() {
        return (
            <div className="imgs-overflow">
                <img className="img-overflow"
                     key={this.props.myKey} src={this.props.images[this.state.keyOfImages]}/>
                <div
                    className="container-of-arrow-img-overflow">
                    <button className="show-arrow"
                            onClick={() => this.GoTheImage("left")}>
                        {"<"}
                    </button>
                    <button className="show-arrow"
                            onClick={() => this.GoTheImage("right")}>
                        {">"}
                    </button>
                </div>
            </div>
        )
    }
}

export default ImageSlider