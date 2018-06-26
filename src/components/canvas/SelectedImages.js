import React, { Component } from 'react';

export default class extends React.Component {
  render() {
    return (
      <div onClick={this.props.click}>
        <img src={this.props.src} />
      </div>
    );
  }
}
