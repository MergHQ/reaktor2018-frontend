import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { addObservation } from '../util/Api';

export default class AddObservationForm extends React.Component {
  render() {
    return (
      <Form inline onSubmit={e => this.submit(e)}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">New Observation</Label>
          <Input type="text" id="exampleEmail" onChange={e => this.tempChanged(e)} placeholder="Temperature" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );

  }

  tempChanged(e) {
    this.setState({
      inputTemp: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    addObservation(parseFloat(this.state.inputTemp), this.props.locationId)
      .then(result => {
        if (result.data.ok) {
          this.props.reloadObservationList(result.data.payload);
        }
      });
  }
}