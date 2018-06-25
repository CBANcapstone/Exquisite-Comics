import React, { Component } from 'react';
import { Image } from 'react-konva';
import Category from './Category';

export default class extends React.Component {
  render() {
    return (
      <div onClick={this.props.click}>
        <img src={this.props.src} />
      </div>
    );
  }
}
