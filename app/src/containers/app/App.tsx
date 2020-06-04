import React from 'react';
import {
  Container, Row, Col, Form, FormControl, Button, ListGroup, Image,
} from 'react-bootstrap';
import './App.scss';

function App() {
  return (
    <Container className="app">
      <Row>
        <Col>
          <Form inline className="search justify-content-md-center">
            <FormControl type="text" placeholder="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item className="results">
              <Container>
                <Row className="results__item">
                  <Col xs={2}>
                    <Image src="http://openweathermap.org/img/wn/04d@2x.png" rounded />
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col>
                          Title
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Desc
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Coords
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="range">
            <Form.Group controlId="formBasicRangeCustom">
              <Form.Label>Range</Form.Label>
              <Form.Control type="range" custom />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
