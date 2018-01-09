import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import AddObservationForm from './AddObservationForm';

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
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Temperature</th>
                  <th>Observed at</th>
                </tr>
              </thead>
              <tbody>
                {this.createTables()}
              </tbody>
            </Table>
          <AddObservationForm location={this.props.location} locationId={this.props.locationId} addNewEntry={this.addNewEntry} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  createTables() {
    let count = 0;
    let entries = this.observations.map(item => {
      let date = new Date(item.createdAt);
      count++;
      return entryToTableRow(item, count);
    });
    return entries;
  }

  addNewEntry(entry) {
    this.observations.push(entryToTableRow(entry, this.state.entries.length + 1));
    this.setState();
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