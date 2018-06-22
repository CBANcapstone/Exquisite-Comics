import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase';
firebase.initializeApp(firebaseConfig);

class Home extends Component {
  constructor(props) {
    super(props);
    this.selectedFile = null;
  }

  handleClick = event => {
    this.props.authLogin();
  };

  uploadFileHandler = () => {
    // Create a root reference: sampleImages folder created in firebase
    const fileName = this.selectedFile.name;
    var storageRef = firebase.storage().ref('/sampleImages/' + fileName);
    let uploadTask = storageRef.put(this.selectedFile);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        //observe state changed progress, pause, resume
      },
      function(error) {
        //unsuccessful upload
      },
      function() {
        //handle succesfull upload
        const postKey = firebase
          .database()
          .ref('Posts/')
          .push().key; //create a new entry in post tree

        var downloadURL = uploadTask.snapshot.downloadURL;
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadURL => console.log(`${downloadURL} is uploaded`))
          .then(() => {
            // console.log('CURRENT USER:', this.props.user.uid);

            let updates = {};
            let postData = {
              url: downloadURL
              // user: this.props.user.uid,
              // event.target.name.value
            };
            updates['Posts/' + postKey] = postData;
            firebase
              .database()
              .ref()
              .update(updates);
            // .update(JSON.parse(JSON.stringify(updates)));
          });
      }
    );
  };

  fileSelectedHandler = event => {
    this.selectedFile = event.target.files[0];
  };

  render() {
    return (
      <div>
        <h1>HOMEPAGE</h1>
        <button onClick={() => this.handleClick()}>Sign in with google</button>
        <br />
        <label>Hello, {this.props.user.displayName}</label>
        <br />
        <h1>Upload a picture</h1>
        <input type="text" id="file" placeholder="write a caption" />
        <br />
        <br />
        <label>
          Upload File
          <input
            type="file"
            name="caption"
            onChange={this.fileSelectedHandler}
          />
          <button onClick={this.uploadFileHandler}>Submit</button>
        </label>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user
  };
}
function mapToProps(dispatch) {
  return {
    authLogin: () => dispatch(auth())
  };
}

export default connect(
  mapState,
  mapToProps
)(Home);
