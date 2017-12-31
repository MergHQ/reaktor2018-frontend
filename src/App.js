import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col } from 'reactstrap';
import * as _ from 'lodash';

import NavBar from './components/NavBar';
import WeatherCard from './components/WeatherCard';

const locations = [
  'Tokyo',
  'Helsinki',
  'NY',
  'Amsterdam',
  'Dubai'
];

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
  return _.times(Math.ceil(locations.length / 2), () => {
    return (
      <Row>
        {_.times(2, () => {
          return !locations.length ? '' : (<WeatherCard location={locations.shift()} />)
        })}
      </Row>
    );
  });
}

export default App;
