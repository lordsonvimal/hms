// @flow

import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

const ChurchContainer = React.lazy(() => import("src/containers/ChurchContainer"));
const ExamContainer = React.lazy(() => import("src/containers/ExamContainer"));

type Props = {};

export default class RouteContainer extends PureComponent<Props> {

  render () {

    return (
      <React.Suspense fallback={null}>
        <Route exact path="/" component={ ChurchContainer } />
        <Route path="/exams" component={ ExamContainer } />
      </React.Suspense>
    );
  }
}
