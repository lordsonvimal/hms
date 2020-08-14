import React, { Component } from 'react';
import axios from "axios"; 
import "src/styles/table.scss";

export default class App extends Component {

  componentDidMount () {
    axios.get("http://localhost:3001/api/v1/churches")
    .then(response => {
      console.log(response);
    });
  }

  render () {

    return (
      <div className="table">
        <div className="header">S.No</div>
        <div className="header">Action</div>
        <div className="header">Name</div>
        <div className="header">Place</div>
      </div>
    );
  }
}
 
