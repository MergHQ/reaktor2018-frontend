import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';

class AboutModal extends React.Component {
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
        <NavLink href="#" onClick={this.toggle}>about</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>About</ModalHeader>
          <ModalBody>
            <p>This project is my <a href="https://www.reaktor.com/">Reaktor</a> summer job assignment submission. Check out the project <a href="https://github.com/MergHQ/reaktor2018-frontend">frontend</a> and <a href="https://github.com/MergHQ/reaktor2018-backend">backend</a> on GitHub.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AboutModal;