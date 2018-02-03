import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class WeatherModal extends React.Component {
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
    return (
      <div>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.location}</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {this.props.observations ? this.props.observations.map(obs => {
                  let obsTs = new Date(obs.createdAt);
                  return (
                    <tr>
                      <td>{`${obsTs.toLocaleDateString()} ${obsTs.toLocaleTimeString()}`}</td>
                      <td>{`${obs.temperature}°C`}</td>
                    </tr>
                  )
                }) : ''}
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
}

export default WeatherModal;