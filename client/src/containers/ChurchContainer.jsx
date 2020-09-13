// @flow

import React, { PureComponent } from 'react';
import http from "src/services/httpService";

type Props = {};

export default class ChurchContainer extends PureComponent<Props> {

  async componentDidMount() {
    await http.get("/api/v1/churches");
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
