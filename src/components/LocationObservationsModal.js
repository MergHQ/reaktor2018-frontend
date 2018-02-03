import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import AddObservationForm from './AddObservationForm';
import Axios from 'axios';

let self;

export default class LocationObservationsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    self = this;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    this.observations = this.props.observations;
    return (
      <div>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.location}</ModalHeader>
          <ModalBody>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Temperature</th>
                  <th>Observed at</th>
                </tr>
              </thead>
              <tbody>
                {(this.state && this.state.observations) ? this.state.observations : ''}
              </tbody>
            </Table>
          <AddObservationForm location={this.props.location} locationId={this.props.locationId} addNewEntry={entry => this.addNewEntry(entry)} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    let observations = [];
    Axios.get('http://localhost:3000/observations/' + this.props.location).then(result => {
      if (result.data.ok) {
        let count = 0;
        observations = result.data.payload.map(observation => {
          count++;
          return entryToTableRow(observation, count);
        });
        this.setState({
          observations
        });
      }
    });
  }

  addNewEntry(entry) {
    let observations = this.state.observations;
    observations.unshift(entryToTableRow(entry, observations.length + 1));
    this.setState({
      observations
    });
  }
}

function entryToTableRow(entry, count) {
    if (!entry) {
      return '';
    }
    let date = new Date(entry.createdAt);
    return (
      <tr>
        <th scope="row">{count}</th>
        <td>{entry.temperature}</td>
        <td>{date.toLocaleString()}</td>
      </tr>
  )
}