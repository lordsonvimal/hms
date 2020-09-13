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

type Props = {
  actions: $ReadOnlyArray<Action>,
  headers: $ReadOnlyArray<Header>,
  rows: $ReadOnlyArray<Object>,
  rowSchema: $ReadOnlyArray<string>,
  showRowNumber?: boolean
};

export default class SimpleTable extends PureComponent<Props> {

  getRows = () => {
    const { actions, rows, rowSchema, showRowNumber } = this.props;
    const rowElements = [];
    _.map(rows, (row, rowIndex) => {
      const rowCells = [];
      if (showRowNumber) rowCells.push(<td className="table__row__cell cell--30px" key={`rowNumber_${rowIndex}`}>{rowIndex + 1}</td>);
      _.map(rowSchema, (schema, index) => {
        rowCells.push(<td className="table__row__cell" key={`row_${rowIndex}_cell${index}`}>{row[schema]}</td>);
      });
      if (!_.isEmpty(actions)) {
        const actionCells = _.map(actions, (action, index) => {
          return <span className="table__actions" key={`row_${rowIndex}_action_${index}`} onClick={() => action.callback(row)}>{action.name}</span>;
        });
        rowCells.push(<td className="table__row__cell" key={`action_${rowIndex}`}>{actionCells}</td>);
      }
      rowElements.push(<tr className="table__row table_row--content" key={`row_${rowIndex}`}>{rowCells}</tr>);
    });
    return rowElements;
  }

  getHeaders = () => {
    const { headers } = this.props;
    const headerCells = _.map(headers, (header, index) => {
      const addClass = header.addClass ? header.addClass : "";
      const customClass = `table__header__cell ${addClass}`; 
      return <th className={customClass} key={`header_${index}`}>{header.name}</th>;
    });
    return headerCells;
  }

  render () {
    const { actions, showRowNumber } = this.props;
    return (
      <table className="table">
        <thead className="table__header">
          <tr className="table__row table__row--header">
            {showRowNumber && <th className="table__header__cell cell--40px">S.No</th>}
            {this.getHeaders()}
            {!_.isEmpty(actions) && <th className="table__header__cell">Actions</th>}
          </tr>
        </thead>
        <tbody className="table__body">
          {this.getRows()}
        </tbody>
      </table>
    );
  }
}
