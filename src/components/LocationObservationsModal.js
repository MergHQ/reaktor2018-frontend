import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import AddObservationForm from './AddObservationForm';
import Axios from 'axios';

export default class LocationObservationsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
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
            <AddObservationForm location={this.props.location} locationId={this.props.locationId} reloadObservationList={entry => this.reloadObservationList(entry)} />
            <br />
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
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    this.loadObservations();
  }

  loadObservations() {
    let observations = [];
    return Axios.get('http://localhost:3000/observations/' + this.props.location).then(result => {
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

  async reloadObservationList(entry) {
    await this.loadObservations();
    this.props.loadCardStats();
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