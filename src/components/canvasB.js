import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';
import firebase from 'firebase';

class Drawing extends Component {
  state = {
    isDrawing: false,
    mode: 'brush'
  };

  componentDidMount() {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');

    this.setState({ canvas, context });
  }

  handleMouseDown = () => {
    console.log('mousedown');
    this.setState({ isDrawing: true });

    // TODO: improve
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

  render() {
    const { canvas } = this.state;
    console.log(this.state, 'in drawing');

    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={300}
        height={300}
        stroke="blue"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default class extends Component {
  state = {
    pic: '',
    allPictures: []
  };
  componentDidMount = () => {
    const picturesRef = firebase.database().ref('Pictures');
    picturesRef.on('value', snapshot => {
      let pictures = snapshot.val();
      let newState = [];
      for (let pic in pictures) {
        newState.push({
          id: pic,
          picture: pictures[pic].picture
        });
      }
      this.setState({
        allPictures: newState
      });
    });
  };

  handleExportClick = () => {
    let pic1 = this.stageRef.getStage().toDataURL();
    let base64StringName = pic1; //.slice(22);
    this.setState({
      pic: base64StringName
    });
    // console.log('PICTYRE STRING >>>>', base64StringName);
    const picturesRef = firebase.database().ref('Pictures');
    const pictue = {
      picture: base64StringName
    };
    picturesRef.push(pictue);
  };
  render() {
    console.log(typeof this.state.pic);
    const imageT =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAC2UlEQVR42u3c3YkiQRQG0MlkcxFsFfHvXURETGdDMIQJYUPYUCYEd0voQZ1p3bWr5LaeCx+I+lDUobG6he/trQPT6/V+9Pv9n4PB4FfKcDg8REq9rrTGtNY30x68qqqPaNBNSWsF33L+buJ7V8BP4N/JtZiugdchB91AN9ANdOjQoUOHDh06dOjQoUOHDh06dOjQnw99NBodlsvlMek19CdHT8jr9fqw2+2OSa9zw5MLhH4JXgqeXBD0JvAS8OQCoN8Czw1PLgD6arW6CX4KD/0J0Lfb7T+jp7S92sm5TzfQDXQDHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4feQfToPW2SueOuaz1tkqHjros9bdKy485GvF6gQxfoAl2gC3SBLtAFukAX6AJdoEtU9LqnLdV+2Oj/r0op1W9XDP2y1CfShqa1TafTs5Ta3HtTst+uCPp3LU6RNnQ2mx0Wi8VZ0nsR0YsVGz6ipy3KZo7H4y/gdSaTSUj0IsWGj+hpi3yVnyYqevZiw0f0tEXZzGvg0dFz9dtlRd9sNuHR06GtCTx9Fh09deGFQk+/iU0FfZFO7vP5/At4ei/SCb4JPNe5I+tBrgk+2n3w6RUf6QpvQs8JXuSW7Tt4D1zuR88NXuzhzCU8yPvQS4AXfQxbw+c6fLxS6n0r9ezAHy7+cBHoAl2gC3SBLtAFukAX6AJdoEtb9KqqftuI10nyTuh7m/FS6Hs1oa8F/nHWD6sI+LmTfD/BVX8XOiwZ6Aa6gW6gQ4cOHTp06NChQ4cOHTp06NChQ4feefRr7VeXSd9t20FDLgD6tfarEi1O5AKgX2u/KtHxQi7Ib/ot+Ky1XSbOQa4JPnttl4l1er+EL1LbZeLdsp22XxWp7TLu0w10A91Ahw4dOnTo0KFDhw4dOnTo0KFDhw4dOvTHTRcrz461XaYV+r6D6HtyLaZrlWdntV2mHXwXKs+6Utv1B/bYnRxmWTliAAAALXRFWHRTb2Z0d2FyZQBieS5ibG9vZGR5LmNyeXB0by5pbWFnZS5QTkcyNEVuY29kZXKoBn/uAAAAAElFTkSuQmCC';
    return (
      <div>
        <img src={imageT} />
        <Stage ref={node => (this.stageRef = node)} width={700} height={700}>
          <Layer>
            <Drawing />
          </Layer>
        </Stage>
        <img src={this.state.pic} />

        <button onClick={this.handleExportClick}>
          {typeof this.state.pic}
        </button>
        <div>
          <h1>All pictures in database</h1>
          <ul>
            {this.state.allPictures.map(pic => {
              return (
                <div>
                  <li>{pic.picture}</li>
                  <img src={pic.picture} width="100" height="100" />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
