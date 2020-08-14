import React, { Component } from 'react';
import axios from "axios"; 

export default class App extends Component {

  componentDidMount () {
    axios.get("http://localhost:3001/api/v1/churches")
    .then(response => {
      console.log(response);
    });
  }

  render () {

    return (
      <div className="">
        <div className="">S.Nos</div>
        <div className="">Action</div>
        <div className="">Name</div>
        <div className="">Place</div>
      </div>
    );
  }
}
 
