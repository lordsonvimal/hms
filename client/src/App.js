// @flow

import React, { PureComponent } from 'react';
import "src/app.scss";
import axios from "axios";

import RouteContainer from "src/containers/RouteContainer";

type Props = {};

export default class App extends PureComponent<Props> {

  componentDidMount () {
    axios.get("/api/v1/churches");
  }

  render () {

    return (
      <RouteContainer />
    );
  }
}
