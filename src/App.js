import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col } from 'reactstrap';
import * as _ from 'lodash';

import NavBar from './components/NavBar';
import WeatherCard from './components/WeatherCard';

import * as locations from './locations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar aboutClicked={this.toggleAbout} />
        <Container>
          <div style={{ paddingTop: '40px' }}>
            {createCards()}
          </div>
        </Container>
      </div>
    );
  }

  toggleAbout() {
    console.log('click');
  }
}

function createCards() {
  let locationKeys = Object.keys(locations)
  return _.times(Math.ceil(locationKeys.length / 2), () => {
    return (
      <Row>
        {_.times(2, () => {
          let location = locationKeys.shift();
          return !locationKeys.length ? '' : (<WeatherCard locationId={locations[location]} location={location} />)
        })}
      </Row>
    );
  });
}

export default App;
