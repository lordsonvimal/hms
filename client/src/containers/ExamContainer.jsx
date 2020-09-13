// @flow

import React, { PureComponent } from 'react';

type Props = {};

export default class ExamContainer extends PureComponent<Props> {

  componentDidMount() {
  }

  render () {
    return (
      <div className="table">
        <div className="header">S.No</div>
        <div className="header">Exam Name</div>
        <div className="header">Max Mark</div>
      </div>
    );
  }
}
