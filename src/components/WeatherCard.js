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
                  <Badge color='secondary'>{this.getLatestObservation()}</Badge>
                </h5>
                <h5>Max temperature (24h): 
                  <Badge color="secondary">{this.getMaxTemp()}</Badge>
                </h5>
                <h5>Min temperature (24h): 
                  <Badge color="secondary">{this.getMinTemp()}</Badge>
                </h5>
                <br />
                <LocationObservationsModal loadCardStats={() => this.loadStats()} location={this.props.location} locationId={this.props.locationId} buttonLabel='View observations' />
              </CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    )
  }

  componentDidMount() {
    console.log(this.props.location)
    this.loadStats();
  }

  loadStats() {
    axios.get('http://localhost:3000/observations/' + this.props.location + '?sortTempDesc=true&filterTo24h=true').then(res => {
      let stats = res.data.payload;
      this.setState({
        locationStats: {
          max: stats.maxTemp,
          min: stats.minTemp,
          observations: stats.observations,
          latestObservation: stats.latestObservation
        }
      });
    });
  }

  getLatestObservation() {
    if (this.state && this.state.locationStats && this.state.locationStats.latestObservation) {
      return this.state.locationStats.latestObservation + '°C';
    }
    return 'No data';
  }

  getMaxTemp() {
    if (this.state && this.state.locationStats) {
      return this.state.locationStats.max + '°C';
    }
    return 'No data';
  }

  getMinTemp() {
    if (this.state && this.state.locationStats) {
      return this.state.locationStats.min + '°C';
    }
    return 'No data';
  }
}
