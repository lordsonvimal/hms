// @flow

import React, { PureComponent } from 'react';
import _ from "lodash";

type Action = {
  callback: Function,
  icon?: string,
  image?: string,
  name?: string
};

type Header = {
  addClass?: string,
  name: string
};

type RowSchema = {
  addClass?: string,
  id: string
};

type Props = {
  actions: $ReadOnlyArray<Action>,
  headers: $ReadOnlyArray<Header>,
  rows: $ReadOnlyArray<Object>,
  rowSchema: $ReadOnlyArray<RowSchema>,
  showRowNumber?: boolean
};

export default class SimpleTable extends PureComponent<Props> {

  getRows = () => {
    const { actions, rows, rowSchema, showRowNumber } = this.props;
    const rowElements = [];
    _.map(rows, (row, rowIndex) => {
      const rowCells = [];
      if (showRowNumber) rowCells.push(<div className="table__cell table__cell--50px" key={`rowNumber_${rowIndex}`}>{rowIndex + 1}</div>);
      _.map(rowSchema, (schema, index) => {
        const addClass = schema.addClass ? schema.addClass : "";
        const customClass = `table__cell ${addClass}`; 
        rowCells.push(<div className={customClass} key={`row_${rowIndex}_cell${index}`}>{row[schema.id]}</div>);
      });
      if (!_.isEmpty(actions)) {
        const actionCells = _.map(actions, (action, index) => {
          return <span className="table__actions" key={`row_${rowIndex}_action_${index}`} onClick={() => action.callback(row)}>
            {action.icon && <i className={action.icon} />}{action.name}
          </span>;
        });
        rowCells.push(<div className="table__cell table__cell--actions" key={`action_${rowIndex}`}>{actionCells}</div>);
      }
      rowElements.push(<div className="table__row table__row--content" key={`row_${rowIndex}`}>{rowCells}</div>);
    });
    return rowElements;
  }

  getHeaders = () => {
    const { headers } = this.props;
    const headerCells = _.map(headers, (header, index) => {
      const addClass = header.addClass ? header.addClass : "";
      const customClass = `table__cell ${addClass}`; 
      return <div className={customClass} key={`header_${index}`}>{header.name}</div>;
    });
    return headerCells;
  }

  render () {
    const { actions, showRowNumber } = this.props;
    return (
      <div className="table">
        <div className="table__header table__header--fixed">
          <div className="table__row table__row--header">
            {showRowNumber && <div className="table__cell table__cell--50px">S.No</div>}
            {this.getHeaders()}
            {!_.isEmpty(actions) && <div className="table__cell table__cell--actions">Actions</div>}
          </div>
        </div>
        <div className="table__body">
          {this.getRows()}
        </div>
      </div>
    );
  }
}
