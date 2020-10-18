// @flow

import React, { PureComponent } from 'react';
import _ from "lodash";

import http from "src/services/httpService";

import SimpleTable from "src/containers/SimpleTable";
import Modal from "src/components/Modal";

type Props = {};

type State = {
  churches: $ReadOnlyArray<Object>,
  isEdit: boolean,
  selected: {
    id: null | number,
    name: string,
    place: string
  },
  show: boolean
};

export default class ChurchContainer extends PureComponent<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      churches: [],
      isEdit: false,
      selected: {
        id: null,
        name: "",
        place: ""
      },
      show: false
    };
  }

  async componentDidMount() {
    await http.get("/api/v1/churches")
      .then(response => this.setState({ churches: response.data }));
  }

  edit = (church: Object) => {
    this.setState({
      isEdit: true,
      selected: {
        id: church.id,
        name: church.name,
        place: church.place
      },
      show: true
    });
  }

  remove = (church: Object) => {
    const churches = _.clone(this.state.churches);
    http.delete(`/api/v1/churches/${church.id}`)
      .then(() => {
        const removedChurches = _.filter(churches, element => element.id !== church.id);
        this.setState({ churches: removedChurches });
      });
  }

  getActions = () => {
    const actions = [{
      callback: this.edit,
      icon: "fas fa-pencil-alt",
    },{
      callback: this.remove,
      icon: "fas fa-trash",
    }];

    return actions;
  }

  hideModal = () => this.setState({ show: false });

  create = () => this.setState({
    isEdit: false,
    selected: {
      id: null,
      name: "",
      place: ""
    },
    show: true
  });

  onChange = (event: Object, key: string) => {
    event.preventDefault();
    const selected = _.clone(this.state.selected);
    selected[key] = event.target.value;
    this.setState({ selected });
  }

  save = () => {
    const { isEdit, selected } = this.state;
    const churches = _.clone(this.state.churches);

    if (isEdit && selected.id) {
      http.put(`/api/v1/churches/${selected.id}`, {church: selected})
        .then(response => {
          const index = _.findIndex(churches, {id: response.data.id});
          churches[index] = response.data;
          this.setState({
            churches,
            show: false
          });
        });
    } else {
      http.post("/api/v1/churches", {church: selected})
        .then(response => {
          churches.push(response.data);
          this.setState({
            churches,
            show: false
          });
        });
    }
  }

  render () {
    const { churches, selected, show } = this.state;

    return (
      <div>
        <SimpleTable
          actions={this.getActions()}
          headers={[{
            addClass: "table__cell--160px",
            name: "Church Name"
          },
          {
            addClass: "table__cell--160px",
            name: "Place"
          }]}
          rows={churches}
          rowSchema={[{
            addClass: "table__cell--160px",
            id: "name"}, {addClass: "table__cell--160px",
              id: "place"
          }]}
          showRowNumber={true}
        />
        <button className="btn btn--circular btn--large float float-r-16 float-b-16" onClick={this.create}>
          <i className="fas fa-plus" />
        </button>
        {show && <Modal onClose={this.hideModal} onSubmit={this.save} title="Church">
          <form className="">
            <div className="row pad-b-8 pad-t-8"><input autoFocus placeholder="Church Name" onChange={event => this.onChange(event, "name")} type="text" value={selected.name} /></div>
            <div className="row"><input placeholder="Place" onChange={event => this.onChange(event, "place")} type="text" value={selected.place} /></div>
          </form>
        </Modal>}
      </div>
    );
  }
}
