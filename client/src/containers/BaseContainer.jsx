// @flow

import React, { PureComponent } from 'react';
import {  BrowserRouter, Link } from 'react-router-dom';
import RouteContainer from "src/containers/RouteContainer";

type Props = {};

export default class BaseContainer extends PureComponent<Props> {

  render () {
    return (
        <BrowserRouter>
          <Link to="/">Churches</Link>
          <Link to="/exams">Exams</Link>
          <Link to="/results">Results</Link>
          <RouteContainer />
        </BrowserRouter>
    );
  }
}
