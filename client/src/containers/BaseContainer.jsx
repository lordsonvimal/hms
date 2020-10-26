// @flow

import React, { PureComponent } from 'react';
import {  BrowserRouter, Link } from 'react-router-dom';
import RouteContainer from "src/containers/RouteContainer";
import church from "src/images/church.png";

type Props = {};

export default class BaseContainer extends PureComponent<Props> {

  render () {
    return (
      <BrowserRouter>
        <ul className="navbar">
          <li><Link className="navbar__logo" to="/"><img className="logo" src={church} /></Link></li>
          <li className="navbar__item"><Link to="/">HMS</Link></li>
          <li className="navbar--right navbar__item"><Link to="/">Churches</Link></li>
          <li className="navbar__item"><Link to="/exams">Exams</Link></li>
          <li className="navbar__item"><Link to="/results">Results</Link></li>
        </ul>
        <div className="body"><RouteContainer /></div>
      </BrowserRouter>
    );
  }
}
