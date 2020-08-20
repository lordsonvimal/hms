// @flow

import React, { PureComponent } from 'react';

type Props = {};

export default class RouteContainer extends PureComponent<Props> {

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
