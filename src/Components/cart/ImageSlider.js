import React from 'react';

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderCount: [...this.props.count]
        }
    }
    changePicture(value, keyproduct) {
        function reassign(array, index, newValue) {
            array[index] = newValue;
            return array;
        }

        if (this.state.sliderCount[keyproduct] < this.props.images.length) {
            if (value === "right") {
                let arrs = reassign(this.state.sliderCount, [keyproduct], this.state.sliderCount[keyproduct] + 1);
                this.setState({
                    sliderCount: arrs,
                })
            }
            if (value === "left" && this.state.sliderCount[keyproduct] === 0) {
                let arrs = reassign(
                    this.state.sliderCount,
                    [keyproduct],
                    this.state.sliderCount[keyproduct] = this.props.images.length);
                this.setState({
                    sliderCount: arrs,
                });
            }
            if (value === "left" && this.state.sliderCount[keyproduct] !== 0) {
                let arrs = reassign(
                    this.state.sliderCount,
                    [keyproduct],
                    this.state.sliderCount[keyproduct] - 1);
                this.setState({
                    sliderCount: arrs,
                });

            }
        }
        if (this.state.sliderCount[keyproduct] === this.props.images.length) {
            if (value === "right") {
                let arrs = reassign(this.state.sliderCount, [keyproduct], this.state.sliderCount[keyproduct] = 0);
                this.setState({
                    sliderCount: arrs,
                })
            }
        }
    }

    render() {
        return (
            <div className={`${this.props.dataFromHeader ? "imgs-overflow" : "imgs"}`}>
                <img className={`${this.props.dataFromHeader ? "img-overflow" : "img"}`}
                     key={this.props.myKey} src={this.props.images[this.state.sliderCount[this.props.myKey]]}/>
                <div
                    className={`${this.props.dataFromHeader ? "container-of-arrow-img-overflow" : "container-of-arrow"}`}>
                    <p className="show-arrow"
                       onClick={() => this.changePicture("left", this.props.myKey)}>
                        {"<"}
                    </p>
                    <p className="show-arrow"
                       onClick={() => this.changePicture("right", this.props.myKey)}>
                        {">"}
                    </p>
                </div>
            </div>


        )
    }
}
export default ImageSlider