import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

const App = () => {
  // Create coins variable and set to empty array
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {
      const data = await API.get('cvcorderapi', `/cvcorder`);
      setOrders(data.orders);
      console.log(data.orders);
    }
    catch (err) {
      console.error(err);
    };
  };

  // Call fetchOrders function when component loads
  useEffect(() => {
    fetchOrders()
  }, [])

  return (

    <>
      <Container>
      <Row className="mb-2">
        <Col><img src={truck} alt="truck" /></Col>
        <Col><h1 className="text-center"><u>Concrete Volume Calculator</u></h1></Col>
      </Row>
      
      <div>
        <h4 className="text-center"><i>Enter Your Details Below:</i></h4>
        <Row>
        <Col><input type="radio" id="wall" name="options" value="wall" />
        <label htmlFor="wall" className="pl-2"> Wall</label></Col>
        <Col><input type="radio" id="footing" name="options" value="footing" />
        <label htmlFor="footing" className="pl-2">Footing</label></Col>
        <Col><input type="radio" id="patio" name="options" value="patio" />
        <label htmlFor="patio" className="pl-2">Floor</label></Col>
        <Col><input type="radio" id="sidewalk" name="options" value="sidewalk" />
        <label htmlFor="sidewalk" className="pl-2">Patio</label></Col>
        </Row>
      </div>

      <div>
          <h4>New Dimension:</h4>
          <Row className="mb-0 pr-2 pt-3 block-example border border-dark text-center">
            <Col className="mb-0">
            <Form.Group className="mb-0">
              <Form.Label htmlFor="width" className="pr-2">Width</Form.Label>
              <Form.Control type="text" id="width" placeholder="width" value="" /><br />
            </Form.Group>
            </Col>
            <h5 className="pt-5">in.</h5>
            <Col className="mb-0">
            <Form.Group className="mb-0">
              <Form.Label htmlFor="height" className="pr-2">Height</Form.Label>
              <Form.Control type="text" id="height" placeholder="Height" value="" /><br />
            </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
            <Col className="mb-0">
            <Form.Group className="mb-0">
              <Form.Label htmlFor="length" className="pr-2">Length</Form.Label>
              <Form.Control type="text" id="length" placeholder="length" value="" /><br />
            </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
          </Row>
          <Row className="float-right">
          <Button variant="primary" size="m" className="float-center mt-2">
            Enter New Dimension
          </Button>
          </Row>
      </div>

      <Row className="mt-2 mb-2">
        <h4>Entries:</h4>
      </Row>
      <Row className="pt-3 block-example border border-dark">
        <Col><p>8in Wide by 10ft high by 100ft long = 24.7 Cubic Yards</p></Col>
      </Row>
      <Row className="pt-3 mb-3 block-example border-left border-right border-bottom border-dark">
        <Col><p><b>Total Cubic Yards:</b></p></Col>
        <Col><p className="float-right"><b>24.7</b></p></Col>
      </Row>

      <div className="">
      <h4 className="mb-3">Order Form:</h4>
      <Row className="pt-3 pb-1 mb-3 block-example border border-dark">
        <Form.Group>
        <Col>
        <Row className="mx-auto">
          <Col>
            <Form.Label htmlFor="date"><b>Date:</b></Form.Label>
            <Form.Control type="text" id="date" name="dates" value="date" /><br />
          </Col>
          <Col>
            <Form.Label htmlFor="customer"><b>Customer:</b></Form.Label>
            <Form.Control type="text" id="customer" name="customers" value="customer" /><br />
          </Col>
        </Row>
        <Row className="mx-auto">
          <Col>
          <Form.Label htmlFor="type"><b>Type of Pour:</b></Form.Label>
          <Form.Control type="text" id="type" name="types" value="type" /><br />
          </Col>
          <Col>
          <Form.Label htmlFor="yards"><b>Cubic Yards:</b></Form.Label>
          <Form.Control type="text" id="yards" name="cubicyards" value="yards" /><br />
          </Col> 
        </Row>
        <Row className="mx-auto">
          <Col>
          <Form.Label htmlFor="chloride"><b>Chloride:</b></Form.Label>
          <Form.Control type="text" id="chloride" name="chloridecontent" value="chloride" /><br />   
          </Col>
          <Col>
          <Form.Label htmlFor="fiber"><b>Fiber Mesh:</b></Form.Label>
          <Form.Control type="text" id="fiber" name="fibermesh" value="fiber" /><br />
          </Col>
        </Row>
        <Row className="mx-auto">
          <Col>
          <Form.Label htmlFor="temp"><b>Temperature:</b></Form.Label>
          <Form.Control type="text" id="temp" name="temperature" value="temp" /><br />
          </Col>
          <Col>
          <Form.Label htmlFor="slump"><b>Slump:</b></Form.Label>
          <Form.Control type="text" id="slump" name="slumpin" value="slump" /><br />
          </Col>
        </Row> 
        <Row className="mx-auto">
          <Col>
          <Form.Label htmlFor="water"><b>Water Content:</b></Form.Label>
          <Form.Control type="text" id="water" name="h20" value="water" /><br />
          </Col>
          <Col> 
          <Form.Label htmlFor="pourDate"><b>Date of Pour:</b></Form.Label>
          <Form.Control type="text" id="pour" name="pourDate" value="pour" /><br />
          </Col>  
        </Row>
        <Row className="mx-auto">
          <Col>    
          <Form.Label htmlFor="address"><b>Address:</b></Form.Label>
          <Form.Control type="text" id="address" name="jobAddress" value="address" /><br />
          </Col>
        </Row> 
        <Row className="mx-auto">
          <Col>   
          <Form.Label htmlFor="special"><b>Special Instructions:</b></Form.Label>
          <Form.Control type="text" id="special" name="specialinstructions" value="special" /><br />
          </Col> 
        </Row>  
          <Button variant="primary" size="m" className="float-right mt-2">
            Place Your Order
          </Button>
        </Col>
        </Form.Group>
      </Row>
      </div>
    
      
      <div className="">
        <h3>Your Order Has Been Confirmed!</h3>
        {
          orders.map((order, index) => (
            <div key={index}>
              <p><b>{order.name}</b> {order.symbol}</p>
            </div>
          ))
        }
      </div>
      </Container>
    </>
  );
}

export default App