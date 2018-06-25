import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import ImagesForCanvas from './imagesForCanvas';
import SelectionBar from './SelectionBar';

export default class extends Component {
  state = {
    images: []
  };

  handleClick = event => {
    this.setState({ images: [...this.state.images, event.target.src] });
  };

  render() {
    return (
      <div>
        <SelectionBar click={this.handleClick} />
        <div id="canvasInfo">
          <Stage width={window.innerWidth} height="700">
            <Layer>
              {this.state.images &&
                this.state.images.map(img => {
                  return <ImagesForCanvas src={img} />;
                })}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
