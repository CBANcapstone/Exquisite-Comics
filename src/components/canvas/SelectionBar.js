import React, { Component } from 'react';
import Category from './Category';
import SelectedImages from './SelectedImages';

const backroundsArr = [
  'http://konvajs.github.io/assets/yoda.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWjG2WyFhwn12hEara4aa_Ejw7aOjTCxFWl5gEAWuU1C23EjR',
  'https://thumbs.dreamstime.com/z/comic-book-background-12720608.jpg'
];
const charactersArr = [
  'http://konvajs.github.io/assets/darth-vader.jpg',
  'http://cdn1-www.dogtime.com/assets/uploads/2009/06/affenpinscher.jpg',
  'https://sonny.js.org/react-komik/dist/char1.png',
  'https://sonny.js.org/react-komik/dist/char2.png',
  'https://sonny.js.org/react-komik/dist/char2_magic.png'
];
const bubblesArr = [
  'https://sonny.js.org/react-komik/dist/chat_left.svg',
  'https://sonny.js.org/react-komik/dist/chat_right.svg'
];

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
