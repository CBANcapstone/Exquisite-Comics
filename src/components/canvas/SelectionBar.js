import React, { Component } from 'react';
import Category from './Category';
import SelectedImages from './SelectedImages';

const backroundsArr = ['http://konvajs.github.io/assets/yoda.jpg'];
const charactersArr = ['http://konvajs.github.io/assets/darth-vader.jpg'];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.categories = ['background', 'characters', 'textbubbles'];
    this.state = {
      images: []
    };
  }
  handleClick = event => {
    switch (event.target.id) {
      case 'background':
        this.setState({ images: backroundsArr });
        break;
      case 'characters':
        this.setState({ images: charactersArr });
        break;
      case 'textbubbles':
        return;
    }
  };
  render() {
    return (
      <div>
        {this.categories &&
          this.categories.map(cat => {
            return <Category category={cat} onClick={this.handleClick} />;
          })}
        {this.state.images &&
          this.state.images.map(img => {
            return <SelectedImages src={img} click={this.props.click} />;
          })}
      </div>
    );
  }
}
