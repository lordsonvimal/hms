// @flow

import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
// import ChurchContainer from "src/containers/ChurchContainer";
// import ExamContainer from "src/containers/ExamContainer";

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
