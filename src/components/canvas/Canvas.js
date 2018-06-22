import React, { Component } from 'react';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';
import firebase from 'firebase';
import Drawing from './DrawingLayer'
import AllPictures from './PicsFromDB'

export default class extends Component {
  constructor() {
    super();
    this.state = {
      currentDrawing: ''
    };
  }

    handleExportClick = () => {
      let picture = this.stageRef.getStage().toDataURL();
      console.log(picture)
      const picturesRef = firebase.database().ref('Pictures');
      picturesRef.push({ picture });
    }

    render() {
      return (
        <div>
          <h1>Canvas Page</h1>
          <Stage ref={node => (this.stageRef = node)} width={300} height={300}>
            <Layer>
              <Drawing />
            </Layer>
          </Stage>
  
          <button onClick={this.handleExportClick}>submit</button>
          <AllPictures />
        </div>
      );
    }
  }