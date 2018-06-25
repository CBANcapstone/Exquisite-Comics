import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Circle, Group} from "react-konva";
import Konva from 'konva';
import Canvas from './Canvas';


// VERY IMPORTANT NOTES
// at first we will set image state to null
// and then we will set it to native image instanse
// only when image is loaded
class YodaImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        const image = new window.Image();
        image.src = "http://konvajs.github.io/assets/yoda.jpg";
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
                image: image
            });
        };
    }

    render() {
        return <Image image={this.state.image} draggable/>;
    }
}

// here is another way to update the image
class VaderImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        const image = new window.Image();
        image.src = "http://konvajs.github.io/assets/darth-vader.jpg";
        image.onload = () => {
            this.setState({
                image: image
            });

        };
    }

    render() {
        return (
            <Image
                image={this.state.image}
                y={300}
                ref={node => {
                    this.imageNode = node;
                }}
                draggable
            />
        );
    }
}

export default class extends Component {

    render() {
        return (
            <div id="canvasInfo">
            <Stage width={window.innerWidth} height="700">
                <Layer>
                    <YodaImage />
                    <VaderImage />
                </Layer>

            </Stage>

            </div>
        );
    }
}



