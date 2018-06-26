import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImagesForCanvas from './imagesForCanvas';
import SelectionBar from './SelectionBar';
// import { Transformer } from 'konva';

export default class extends Component {
  state = {
    images: []
  };

  handleClick = event => {
    this.setState({ images: [...this.state.images, event.target.src] });
  };

  render() {
    return (
      <div className='root-canvas'>
        <div className='root-canvas-selection-bar'>
          <SelectionBar click={this.handleClick} />
        </div>
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
