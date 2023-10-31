import React from 'react';

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageKey: 0
        }
    }

    SelectImg(data) {
        data === "left" ?
            this.setState({
                currentImageKey: this.state.currentImageKey === 0 ? this.props.images.length - 1 : this.state.currentImageKey - 1
            })
            :
            this.setState({
                currentImageKey: this.state.currentImageKey === this.props.images.length - 1 ? 0 : this.state.currentImageKey + 1
            })

    }

    render() {
        return (
            <div className="imgs">
                <img className="img"
                     key={this.props.imageKey} src={this.props.images[this.state.currentImageKey]} alt="Product"/>
                <div
                    className="container-of-arrow">
                    <button className="show-arrow"
                            onClick={() => this.SelectImg("left")}>
                        {"<"}
                    </button>
                    <button className="show-arrow"
                            onClick={() => this.SelectImg("right")}>
                        {">"}
                    </button>
                </div>
            </div>
        )
    }
}

export default ImageSlider