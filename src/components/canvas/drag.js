import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImagesForCanvas from './imagesForCanvas';
import SelectionBar from './SelectionBar';

//CG: Commented out resource. TODO: Remove this comment when we implement Konva for the drag.
// import { Transformer } from 'konva';

//CG: Capitalize this file name, exercise consistency. 
export default class extends Component {
  state = {
    images: []
  };

  handleClick = event => {
    this.setState({ images: [...this.state.images, event.target.src] });
  };

  //CG: Classless Div, canvas-drag, canvas-drag-info. Do not capitalize class or id names 
  //CG: SelectionBar should potentially be renamed to be a subcomponent of a canvas. Canvas-SelectionBar. We want THIS component to wrap that selection bar in an appropriate div. 
  /*
    className="canvas-drag-selection"
  */
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
