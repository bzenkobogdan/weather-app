import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as RB from 'react-bootstrap';
import './App.scss';

import Background from 'components/background';

import * as searchSelectors from 'data-layer/search/selectors';
import * as userSelectors from 'data-layer/user/selectors';
import { search as searchAction, searchDetails as searchDetailsAction } from 'data-layer/search/actions';
import { location as searchLocationAction } from 'data-layer/user/actions';

const parse = (num: number): string => num.toFixed();
const getImageLink = (name: string): string => `https://www.metaweather.com/static/img/weather/${name}.svg`;

function getLocation(cb: PositionCallback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
  }
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export function App(props: Props) {
  const [searchValue, updateSearch] = useState('');
  // const [temp, updateTemp] = useState(0);
  const [prevTemp, setPrevTemp] = useState(0);

  if (props.temp !== prevTemp) {
    setPrevTemp(props.temp);
  }

  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (searchValue.length >= 3) {
      props.searchAction({ value: searchValue });
    }
  };

  const searchByLocation = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    props.searchDetailsAction({ value: id });
  };

  const userLocation = ({ coords }: { coords: ICoordinates }) => {
    props.searchLocationAction({ value: `${coords.latitude},${coords.longitude}` });
  };

  useEffect(() => {
    getLocation(userLocation);
  }, []);

  return (
    <Background temp={props.temp}>
      <RB.Modal show={_.isEmpty(props.results)} onHide={() => { }}>
        <RB.Modal.Header>
          <RB.Modal.Title>Choose your City!</RB.Modal.Title>
        </RB.Modal.Header>
        <RB.Modal.Body>
          {(!_.isEmpty(props.location)
            && props.location.map((location: any) => (
              <RB.Button
                onClick={(e: React.MouseEvent) => searchByLocation(e, location.woeid)}
                block
                key={location.woeid}
              >
                {location.title}
              </RB.Button>
            ))) || <RB.Spinner animation="border" />}
        </RB.Modal.Body>
        <RB.Modal.Footer />
      </RB.Modal>
      <RB.Container className="app">
        <RB.Row>
          <RB.Col>
            <RB.Form inline className="search justify-content-md-center">
              <RB.FormControl
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
              />
              <RB.Button onClick={search} type="submit" variant="outline-success">
                Search
              </RB.Button>
            </RB.Form>
          </RB.Col>
        </RB.Row>
        {!_.isEmpty(props.results)
          && (
            <RB.Row>
              <RB.Col>
                <RB.ListGroup variant="flush">
                  <RB.ListGroup.Item className="results">
                    <RB.Container>
                      {props.results.map((result: any) => (
                        <RB.Row className="results__item" key={result.id}>
                          <RB.Col xl={1} lg={1}>
                            <RB.Image src={getImageLink(result.weather_state_abbr)} rounded />
                          </RB.Col>
                          <RB.Col>
                            <RB.Container>
                              <RB.Row>
                                <RB.Col>
                                  {props.city}
                                  /
                                  {props.country}
                                  {' '}
                                  {result.weather_state_name}
                                </RB.Col>
                              </RB.Row>
                              <RB.Row>
                                <RB.Col>
                                  <RB.Badge variant="dark">
                                    {parse(result.the_temp)}
                                    {' '}
                                    °С
                                  </RB.Badge>
                                  {' '}
                                  temperature from
                                  {parse(result.min_temp)}
                                  {' '}
                                  to
                                  {parse(result.max_temp)}
                                  {' '}
                                  {parse(result.wind_speed)}
                                  {' '}
                                  m/s. clouds 100 %,
                                  {' '}
                                  {parse(result.air_pressure)}
                                  {' '}
                                  hpa
                                </RB.Col>
                              </RB.Row>
                              <RB.Row>
                                <RB.Col>
                                  Geo coords
                                  {props.coords}
                                </RB.Col>
                              </RB.Row>
                            </RB.Container>
                          </RB.Col>
                        </RB.Row>
                      ))}
                    </RB.Container>
                  </RB.ListGroup.Item>
                </RB.ListGroup>
              </RB.Col>
            </RB.Row>
          )}
        {!_.isEmpty(props.results)
          && (
            <RB.Row className="justify-content-md-center">
              <RB.Image className="main-icon" src={getImageLink(props.results[0].weather_state_abbr)} />
            </RB.Row>
          )}
        {/* <RB.Row>
          <RB.Col>
            <RB.Form className="range">
              <RB.Form.Group controlId="formBasicRangeCustom">
                <RB.Form.Label>Range</RB.Form.Label>
                <RB.Form.Control min="-40" max="60" type="range"
                  custom value={temp} onChange={(e: any) => updateTemp(e)} />
              </RB.Form.Group>
            </RB.Form>
          </RB.Col>
        </RB.Row> */}
      </RB.Container>
    </Background>
  );
}

interface Props {
  country: string,
  city: string,
  coords: string,
  results: any,
  location: any,
  temp: number,
  searchAction: Function,
  searchLocationAction: Function,
  searchDetailsAction: Function
}

export default connect((state: Props) => ({
  country: searchSelectors.getCountry(state),
  city: searchSelectors.getCity(state),
  coords: searchSelectors.getCoords(state),
  results: searchSelectors.getResults(state),
  temp: searchSelectors.getTemp(state),
  location: userSelectors.getLocation(state),
}), { searchAction, searchLocationAction, searchDetailsAction })(App);
