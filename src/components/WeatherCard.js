import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col,
  Table, Badge
} from 'reactstrap';
import * as axios from 'axios';

export default class WeatherCard extends React.Component {
  render() {
    return (
      <Col>
        <div style={{ padding: '40px' }}>
          <Card>
            <CardBody>
              <CardTitle>{this.props.location}</CardTitle>
              <CardText><h3>Latest observation: <Badge color='secondary'>{(this.state && this.state.observations && this.state.observations.length) ? this.state.observations[0].temperature + '°C' : ''}</Badge></h3></CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    )
  }

  componentDidMount() {
    axios.get('http://localhost:3000/observations/' + this.props.location).then(res => {
      this.setState({
        observations: res.data.payload.sort((a, b) => a.temperature - b.temperature)
      });
    });
  }
}
