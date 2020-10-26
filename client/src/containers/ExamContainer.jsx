// @flow

import React, { PureComponent } from 'react';
import _ from "lodash";

import http from "src/services/httpService";

import SimpleTable from "src/containers/SimpleTable";
import Modal from "src/components/Modal";

type Props = {};

type State = {
  exams: $ReadOnlyArray<Object>,
  isEdit: boolean,
  selected: {
    id: null | number,
    name: string,
    place: string
  },
  show: boolean
};

export default class ExamContainer extends PureComponent<Props, State> {

  constructor (props: Props) {
    super(props);
    this.state = {
      exams: [],
      isEdit: false,
      selected: {
        id: null,
        name: "",
        max: "",
        pass: "",
        ranks: []
      },
      show: false
    };
  }

  async componentDidMount() {
    await http.get("/api/v1/exams")
      .then(response => this.setState({ exams: response.data.data }));
  }

  edit = (exam: Object) => {
    this.setState({
      isEdit: true,
      selected: {
        id: exam.id,
        name: exam.name,
        max: exam.max,
        pass: exam.pass,
        ranks: exam.ranks
      },
      show: true
    });
  }

  remove = (exam: Object) => {
    const exams = _.clone(this.state.exams);
    http.delete(`/api/v1/exams/${exam.id}`)
      .then(() => {
        const removedexams = _.filter(exams, element => element.id !== exam.id);
        this.setState({ exams: removedexams });
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
      max: "",
      pass: "",
      ranks: []
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
    const exams = _.clone(this.state.exams);

    if (isEdit && selected.id) {
      http.put(`/api/v1/exams/${selected.id}`, {exam: selected})
        .then(response => {
          const index = _.findIndex(exams, {id: response.data.data.id});
          exams[index] = response.data.data;
          this.setState({
            exams,
            show: false
          });
        });
    } else {
      http.post("/api/v1/exams", {exam: selected})
        .then(response => {
          exams.push(response.data.data);
          this.setState({
            exams,
            show: false
          });
        });
    }
  }

  render () {
    const { exams, selected, show } = this.state;
    const parsedExams = _.map(exams, exam => exam.attributes);

    return (
      <div className="height-100p overflow--hide pad-8">
        <SimpleTable
          actions={this.getActions()}
          headers={[{
            addClass: "table__cell--160px",
            name: "Exam Name"
          },
          {
            addClass: "table__cell--160px",
            name: "Max Marks"
          },
          {
            addClass: "table__cell--160px",
            name: "Pass Marks"
          }]}
          rows={parsedExams}
          rowSchema={[{
            addClass: "table__cell--160px",
            id: "name"}, {addClass: "table__cell--160px",
              id: "max"}, {addClass: "table__cell--160px",
              id: "pass"
          }]}
          showRowNumber={true}
        />
        <button className="btn btn--circular btn--large float float-r-16 float-b-16" onClick={this.create}>
          <i className="fas fa-plus" />
        </button>
        {show && <Modal onClose={this.hideModal} onSubmit={this.save} title="exam">
          <form className="">
            <div className="row pad-b-8 pad-t-8"><input autoFocus placeholder="Exam Name" onChange={event => this.onChange(event, "name")} type="text" value={selected.name} /></div>
            <div className="row pad-b-8"><input placeholder="Max Marks" onChange={event => this.onChange(event, "max")} type="text" value={selected.max} /></div>
            <div className="row"><input placeholder="Pass" onChange={event => this.onChange(event, "pass")} type="text" value={selected.pass} /></div>
          </form>
        </Modal>}
      </div>
    );
  }
}
