// @flow

import React, { PureComponent } from 'react';
import http from "src/services/httpService";

import SimpleTable from "src/containers/SimpleTable";

type Props = {};

export default class ChurchContainer extends PureComponent<Props> {

  async componentDidMount() {
    await http.get("/api/v1/churches");
  }

  edit = (church: Object) => {
    console.log(church); //eslint-disable-line
  }

  remove = (church: Object) => {
    console.log(church); //eslint-disable-line
  }

  getActions = () => {
    const actions = [{
      callback: this.edit,
      name: "Edit"
    },{
      callback: this.remove,
      name: "Delete"
    }];

    return actions;
  }

  render () {
    return (
      <SimpleTable
        actions={this.getActions()}
        headers={[{
          addClass: "",
          name: "Church Name"
        },
        {
          customClass: "",
          name: "Place"
        }]}
        rows={[{
          name: "CSI Christ church",
          id: 1,
          place: "Virugambakkam"
        }]}
        rowSchema={["name", "place"]}
        showRowNumber={true}  
      />
    );
  }
}
