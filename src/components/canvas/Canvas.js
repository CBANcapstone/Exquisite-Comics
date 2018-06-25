import React, { Component } from 'react';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';
import firebase from 'firebase';
import AllPictures from './PicsFromDB';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      currentDrawing: '',
      canvas: null,
      context: null,
      canvasSize: {
        width: 1000,
        height: 700
      }
    };
  }

  componentDidMount() {
    const canvas = document.createElement('canvas');
    canvas.width = this.state.canvasSize.width;
    canvas.height = this.state.canvasSize.height;
    const context = canvas.getContext('2d');
    this.setState({ canvas, context });
  }

  handleMouseDown = () => {
    this.setState({ isDrawing: true });
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();
  };

  handleMouseUp = () => {
    console.log('mouseup');
    this.setState({ isDrawing: false });
  };

  handleMouseMove = () => {
    // console.log('mousemove');
    const { context, isDrawing, mode } = this.state;

    if (isDrawing) {
      console.log('drawing');

      // TODO: Don't always get a new context
      context.strokeStyle = '#df4b26';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      } else if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: this.lastPointerPosition.x - this.image.x(),
        y: this.lastPointerPosition.y - this.image.y()
      };
      console.log('moveTo', localPos);
      context.moveTo(localPos.x, localPos.y);

      // TODO: improve
      const stage = this.image.parent.parent;

      var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - this.image.x(),
        y: pos.y - this.image.y()
      };
      console.log('lineTo', localPos);
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      this.lastPointerPosition = pos;
      this.image.getLayer().draw();
    }
  };

  handleExportClick = () => {
    let picture = this.stageRef.getStage().toDataURL();
    console.log(picture);
    const picturesRef = firebase.database().ref('Pictures');
    picturesRef.push({ picture });
  };

  render() {
    const { canvas } = this.state;
    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        stroke="blue"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}
