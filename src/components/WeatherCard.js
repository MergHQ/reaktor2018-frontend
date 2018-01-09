import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col,
  Table, Badge
} from 'reactstrap';
import * as axios from 'axios';

import LocationObservationsModal from './LocationObservationsModal';

export default class WeatherCard extends React.Component {
  render() {
    return (
      <Col>
        <div style={{ padding: '40px' }}>
          <Card>
            <CardBody>
              <CardTitle>{this.props.location}</CardTitle>
              <CardText>
                <h5>Latest observation: 
                  <Badge color='secondary'>{this.getLatestObservation() + '°C'}</Badge>
                </h5>
                <h5>Max temperature (24h): 
                  <Badge color="secondary">{this.getMaxTemp() + '°C'}</Badge>
                </h5>
                <h5>Min temperature (24h): 
                  <Badge color="secondary">{this.getMinTemp() + '°C'}</Badge>
                </h5>
                <br />
                <LocationObservationsModal location={this.props.location} locationId={this.props.locationId} buttonLabel='View observations' observations={this.getObservations()} />
              </CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    )
  }

  componentDidMount() {
    axios.get('http://localhost:3000/observations/' + this.props.location + '?sortTempDesc=true&filterTo24h=true').then(res => {
      let stats = res.data.payload;
      this.setState({
        locationStats: {
          max: stats.maxTemp,
          min: stats.minTemp,
          observations: stats.observations
        }
      });
    });
  }

  getLatestObservation() {
    if (this.state && this.state.locationStats && this.state.locationStats.observations) {
      if (this.state.locationStats.observations.length) {
        return this.state.locationStats.observations[0].temperature;
      }
    }
    return '';
  }

  getMaxTemp() {
    if (this.state && this.state.locationStats) {
      return this.state.locationStats.max;
    }
    return '';
  }

  getMinTemp() {
    if (this.state && this.state.locationStats) {
      return this.state.locationStats.min;
    }
    return '';
  }

  getObservations() {
    if (this.state && this.state.locationStats && this.state.locationStats.observations) {
      return this.state.locationStats.observations;
    }
    return [];
  }
}
