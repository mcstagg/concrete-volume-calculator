import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyModal from './VerifyModal';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

const App = () => {

  // Dimension variables
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [cubicYards, setCubicYards] = useState(0);
  const [totalCubicYards, setTotalCubicYards] = useState(0);
  const [entries, setEntries] = useState([]);

  // Dimension and display logic
  // Handles the add dimension event upon add new dimension button click
  const addDimension = (width, height, length) => {

    let heightInInches = height * 12;
    let lengthInInches = length * 12;
    let cubicInches = width * heightInInches * lengthInInches;
    let inchesInYards = 46656;
    let volume = (cubicInches / inchesInYards)
    calculateTotalCubicYards(volume);
    setCubicYards(Number(volume.toFixed(2))); 

    setEntries(
      entries.concat({
        width: width,
        height: height,
        length: length,
        cubicYards: volume.toFixed(2)
      })
    );
  };

  const calculateTotalCubicYards = (volume) => {
    let total = totalCubicYards;
    let totalVolume = (total += volume);
    let fixedVolume = Number(totalVolume.toFixed(2));
    setTotalCubicYards(fixedVolume); 
  }

  // Order form variables
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [typeOfPour, setTypeOfPour] = useState();
  const [chloride, setChloride] = useState();
  const [fiberMesh, setFiberMesh] = useState();
  const [temperature, setTemperature] = useState();
  const [slump, setSlump] = useState();
  const [waterContent, setWaterContent] = useState();
  const [dateOfPour, setDateOfPour] = useState();
  const [address, setAddress] = useState();
  const [specialInstructions, setSpecialInstructions] = useState();
  const [placedOrder, setPlacedOrder] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  // Order and display logic
  const addOrder = () => {

    setEntries(
      placedOrder.concat({
        date: date,
        customer: customer,
        typeOfPour: typeOfPour,
        cubicYards: cubicYards,
        chloride: chloride,
        fiberMesh: fiberMesh,
        temperature: temperature,
        slump: slump,
        waterContent: waterContent,
        dateOfPour: dateOfPour,
        address: address,
        specialInstructions: specialInstructions
      })
    );
  }

  const showVerifyModal = () => {
    setModalShow(true);
  }

  // Confirmation variables
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
        <Col>
          <img 
            src={truck} 
            alt="truck" 
          />
        </Col>
        <Col>
          <h1 className="text-center">
            <u>Concrete Volume Calculator</u>
          </h1>
        </Col>
      </Row>
      
      <div>
        <h4 className="text-center">
          <i>Enter Your Details Below:</i>
        </h4>
        <Row>
        <Col>
          <input 
            type="radio" 
            id="wall" 
            name="options"
            value="wall"
            onChange={
              e => setTypeOfPour(e.target.value)
            }
          />
          <label 
            htmlFor="wall" 
            className="pl-2"
          > 
            Wall
          </label>
        </Col>
        <Col>
          <input 
            type="radio" 
            id="footing" 
            name="options"
            value="footing"
            onChange={
              e => setTypeOfPour(e.target.value)
            } 
          />
          <label 
            htmlFor="footing" 
            className="pl-2"
          > 
            Footing
          </label>
        </Col>
        <Col>
          <input 
            type="radio" 
            id="patio" 
            name="options"
            value="floor"
            onChange={
              e => setTypeOfPour(e.target.value)
            } 
          />
          <label 
            htmlFor="patio" 
            className="pl-2"
          >
            Floor
          </label>
        </Col>
        <Col>
          <input 
            type="radio" 
            id="patio" 
            name="options"
            value="patio"
            onChange={
              e => setTypeOfPour(e.target.value)
            } 
          />
          <label 
            htmlFor="sidewalk" 
            className="pl-2"
          >
            Patio
          </label></Col>
        </Row>
      </div>

      <div>
          <h4>New Dimension:</h4>
          <Row 
            className="mb-0 pr-2 pt-3 block-example border border-dark text-center"
          >
            <Col className="mb-0">
              <Form.Group className="mb-0">
                <Form.Label 
                  htmlFor="width" 
                  className="pr-2"
                >
                  Width
                </Form.Label>
                <Form.Control 
                  type="text" 
                  id="width" 
                  placeholder="width"
                  value={width} 
                  onChange={
                    e => setWidth(e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <h5 className="pt-5">in.</h5>
            <Col className="mb-0">
              <Form.Group className="mb-0">
                <Form.Label 
                  htmlFor="height" 
                  className="pr-2"
                >
                  Height
                </Form.Label>
                <Form.Control 
                  type="text" 
                  id="height" 
                  placeholder="Height"
                  value={height} 
                  onChange={
                    e => setHeight(e.target.value)
                  } 
                />
              </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
            <Col className="mb-0">
              <Form.Group className="mb-0">
                <Form.Label 
                  htmlFor="length" 
                  className="pr-2"
                >
                  Length
                </Form.Label>
                <Form.Control 
                  type="text" 
                  id="length" 
                  placeholder="length"
                  value={length} 
                  onChange={
                    e => setLength(e.target.value)
                  }  
                />
              </Form.Group>
            </ Col>
            <h5 className="pt-5">ft.</h5>
          </Row>
          <Row className="float-right">
            <Button 
              variant="primary" 
              size="m" 
              className="mt-2 pl-4 pr-4"
              onClick={
                () => {
                  addDimension(width, height, length);
                  setWidth(' ');
                  setHeight(' ');
                  setLength(' ');
                }
              }
            >
              Enter New Dimension
            </Button>
          </Row>
      </div>

      <Row className="mt-2 mb-2">
        <h4>Entries:</h4>
      </Row>
      <Row 
        className="pt-3 pb-3 block-example border border-dark"
      >
        <Col>
          {
            entries.map(
              (entry, index) => (
                <span key={index}>
                  <b>{entry.width}</b> in. wide by&nbsp;
                  <b>{entry.height}</b> ft. high by&nbsp;
                  <b>{entry.length}</b> ft. long =&nbsp;
                  <b>{entry.cubicYards}</b> cubic yards
                  <br />
                </span>
              )
            )
          }
        </Col>
      </Row>
      <Row 
        className="pt-3 mb-3 block-example border-left border-right border-bottom border-dark"
      >
        <Col>
          <p><b>Total Cubic Yards:</b></p>
        </Col>
        <Col>
          <p className="float-right">
          <b>
            {
              totalCubicYards
            }
          </b>
          </p>
        </Col>
      </Row>

      <div className="">
      <h4 className="mb-3">Order Form:</h4>
      <Row className="pt-3 pb-1 mb-3 block-example border border-dark">
        <Col>
          <Form.Group>
          <Col>
          <Row className="mx-auto">
            <Col className="mb-0">
              <Form.Label htmlFor="date">
                <b>Date:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="date" 
                name="dates" 
                placeholder="MM/DD/YY"
                onChange={
                  e => setDate(e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Label htmlFor="customer">
                <b>Customer:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="customer" 
                name="customers" 
                placeholder="customer"
                onChange={
                  e => setCustomer(e.target.value)
                } 
              />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
              <Form.Label htmlFor="type">
                <b>Type of Pour:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="type" 
                name="types" 
                placeholder={typeOfPour}
                onChange={
                  e => setTypeOfPour(e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Label htmlFor="yards">
                <b>Cubic Yards:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="yards" 
                name="cubicyards" 
                placeholder={totalCubicYards}
                onChange={
                  e => setTotalCubicYards(e.target.value)
                }
              />
            </Col> 
          </Row>
          <Row className="mx-auto">
            <Col>
              <Form.Label htmlFor="chloride">
                <b>Chloride:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="chloride" 
                name="chloridecontent" 
                placeholder="chloride"
                onChange={
                  e => setChloride(e.target.value)
                }
              />   
            </Col>
            <Col>
              <Form.Label htmlFor="fiber">
                <b>Fiber Mesh:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="fiber" 
                name="fibermesh" 
                placeholder="fiber mesh"
                onChange={
                  e => setFiberMesh(e.target.value)
                } 
              />
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>
            <Form.Label htmlFor="temp">
              <b>Temperature:</b>
            </Form.Label>
            <Form.Control 
              type="text" 
              id="temp" 
              name="temperature" 
              placeholder="temp"
              onChange={
                e => setTemperature(e.target.value)
              } 
            />
            </Col>
            <Col>
              <Form.Label htmlFor="slump">
                <b>Slump:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="slump" 
                name="slumpin" 
                placeholder="slump"
                onChange={
                  e => setSlump(e.target.value)
                } 
              />
            </Col>
          </Row> 
          <Row className="mx-auto">
            <Col>
              <Form.Label htmlFor="water">
                <b>Water Content:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="water" 
                name="h20" 
                placeholder="water content"
                onChange={
                  e => setWaterContent(e.target.value)
                } 
              />
            </Col>
            <Col> 
              <Form.Label htmlFor="pourDate">
                <b>Date of Pour:</b>
              </Form.Label>
              <Form.Control 
                type="text" 
                id="pour" 
                name="pourDate" 
                placeholder="date of pour"
                onChange={
                  e => setDateOfPour(e.target.value)
                } 
              />
            </Col>  
          </Row>
          <Row className="mx-auto">
            <Col>    
              <Form.Label htmlFor="address">
                <b>Address:</b>
              </Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                type="text" 
                id="address" 
                name="jobAddress" 
                placeholder="address"
                onChange={
                  e => setAddress(e.target.value)
                } 
              />
            </Col>
          </Row> 
          <Row className="mx-auto">
            <Col>   
              <Form.Label htmlFor="special">
                <b>Special Instructions:</b>
              </Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                type="text" 
                id="special" 
                name="specialinstructions" 
                placeholder="special instructions"
                onChange={
                  e => setSpecialInstructions(e.target.value)
                } 
              />
            </Col> 
          </Row>  
            <Button 
              variant="primary" 
              size="m" 
              className="float-right mb-3 mt-3 mr-3 pl-5 pr-5"
              onClick={
                () => {
                  addOrder();
                  showVerifyModal();
                }
              }
            >
              Place Your Order
            </Button>
          </Col>
          </Form.Group>
        </Col>
      </Row>
      </div>

      <VerifyModal 
        show={modalShow} 
        onHide={
          () => setModalShow(false)
        }
        entries={entries} 
      />
    
      <Row className="pt-2 mb-3 block-example border border-dark">
        <Col>
          <h3 className="mb-3">Your Order Has Been Confirmed!</h3>
          {
            orders.map((order, index) => (
              <div key={index}>
                <p><b>{order.name}</b> {order.symbol}</p>
              </div>
            ))
          }
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default App