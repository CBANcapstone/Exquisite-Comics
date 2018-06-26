import React, { Component } from 'react';

export default class extends React.Component {
  render() {
    return (
      <div onClick={this.props.click} className="selected-images-padding">
        <img src={this.props.src} width="100" height="100" />
      </div>
    );
  }
}
