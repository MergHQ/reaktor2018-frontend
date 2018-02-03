import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as axios from 'axios';

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
    axios.put('http://localhost:3000/observations/', {
      location: this.props.locationId,
      temperature: parseFloat(this.state.inputTemp)
    }).then(result => {
      console.log(e);
      if (result.data.ok) {
        this.props.reloadObservationList(result.data.payload);
      }
    })
  }
}