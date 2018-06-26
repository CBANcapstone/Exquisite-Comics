import React, { Component } from 'react';
import Category from './Category';
import SelectedImages from './SelectedImages';
import {backgroundsArr, charactersArr, bubblesArr} from '../../initialData';

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
        this.setState({ images: backgroundsArr });
        break;
      case 'characters':
        this.setState({ images: charactersArr });
        break;
      case 'textbubbles':
        this.setState({ images: bubblesArr });
        break;
    }
  };
  render() {
    return (
      <div>
        <div className="horizontalFlex">
          {this.categories &&
            this.categories.map(cat => {
              return <Category category={cat} onClick={this.handleClick} />;
            })}
        </div>
        <div className="horizontalFlex">
          {this.state.images &&
            this.state.images.map(img => {
              return <SelectedImages src={img} click={this.props.click} />;
            })}
        </div>
      </div>
    );
  }
}
