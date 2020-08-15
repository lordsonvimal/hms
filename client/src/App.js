import React, { Component } from 'react';
import "src/app.scss";
import axios from "axios";

export default class App extends Component {

  componentDidMount () {
    axios.get("/api/v1/churches");
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
 
