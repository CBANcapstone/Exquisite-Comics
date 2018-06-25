import React, { Component } from 'react';
import { Image } from 'react-konva';

export default class extends React.Component {
  render() {
    return (
      <div id={this.props.category} onClick={this.props.onClick}>
        {this.props.category}
      </div>
    );
  }
}
