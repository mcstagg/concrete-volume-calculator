import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form } from 'react-bootstrap';

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
      <Row>
        <Col><img src={truck} alt="truck" /></Col>
        <Col><h1 className="text-center"><u>Concrete Volume Calculator</u></h1></Col>
      </Row>
      
      <div>
        <form action="">
          <h4 className="text-center"><i>Enter Your Details Below:</i></h4>
          <Row>
          <Col><input type="radio" id="wall" name="options" value="wall" />
          <label htmlFor="wall" className="pl-2"> Wall</label></Col>
          <Col><input type="radio" id="footing" name="options" value="footing" />
          <label htmlFor="footing" className="pl-2">Footing</label></Col>
          <Col><input type="radio" id="patio" name="options" value="patio" />
          <label htmlFor="patio" className="pl-2">Patio</label></Col>
          <Col><input type="radio" id="sidewalk" name="options" value="sidewalk" />
          <label htmlFor="sidewalk" className="pl-2">Sidewalk</label></Col>
          </Row>
        </form>
      </div>

      <div>
        <form>
          <h4>New Dimension:</h4>
          <div className="text-center">
          <Row>
            <Col>
            <Form.Group>
              <Form.Label htmlFor="width" className="pr-2">Width</Form.Label>
              <Form.Control type="text" id="width" placeholder="width" value="" /><br />
            </Form.Group>
            </Col>
            <h5 className="pt-5">in.</h5>
            <Col>
            <Form.Group>
              <Form.Label htmlFor="height" className="pr-2">Height </Form.Label>
              <Form.Control type="text" id="height" placeholder="Height" value="" /><br />
            </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
            <Col>
            <Form.Group>
              <Form.Label htmlFor="length" className="pr-2">Length </Form.Label>
              <Form.Control type="text" id="length" placeholder="length" value="" /><br />
            </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
          </Row>
          </div>
          <input type="submit" value="Add New Dimension" />
        </form>
      </div>

      <div>
        <h4>Entries:</h4>
        <p>8in Wide by 10ft high by 100ft long = 24.7 Cubic Yards</p>
        <p><b>Total Cubic Yards: 24.7</b></p>
      </div>

      <div>
        <form>
          <h4>Order Form:</h4>
          <label htmlFor="date">Date: </label>
          <input type="text" id="date" name="dates" value="date" /><br />
          <label htmlFor="customer">Customer: </label>
          <input type="text" id="customer" name="customers" value="customer" /><br />
          <label htmlFor="type">Type of Pour: </label>
          <input type="text" id="type" name="types" value="type" /><br />
          <label htmlFor="yards">Cubic Yards: </label>
          <input type="text" id="yards" name="cubicyards" value="yards" /><br />
          <label htmlFor="chloride">Chloride: </label>
          <input type="text" id="chloride" name="chloridecontent" value="chloride" /><br />
          <label htmlFor="fiber">Fiber Mesh: </label>
          <input type="text" id="fiber" name="fibermesh" value="fiber" /><br />
          <label htmlFor="temp">Temperature: </label>
          <input type="text" id="temp" name="temperature" value="temp" /><br />
          <label htmlFor="slump">Slump: </label>
          <input type="text" id="slump" name="slumpin" value="slump" /><br />
          <label htmlFor="water">Water Content: </label>
          <input type="text" id="water" name="h20" value="water" /><br />
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" name="jobadress" value="address" /><br />
          <label htmlFor="special">Special Instructions: </label>
          <input type="text" id="special" name="specialinstructions" value="special" /><br />
          <input type="submit" value="Place Your Order" />
        </form>
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