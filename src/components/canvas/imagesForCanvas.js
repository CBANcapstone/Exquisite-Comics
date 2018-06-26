import React, { Component } from 'react';
import { Image } from 'react-konva';
import Photo from './Photo';

//CG: Make sure you capitalize this.
export default class imagesForCanvas extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src || 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    // return <Image name="rectange-name" image={this.state.image} draggable />;
    return this.state.image && <Photo image={this.state.image} />;
  }
}
