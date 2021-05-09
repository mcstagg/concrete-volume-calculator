import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyModal from './VerifyModal';
import ConfirmModal from './ConfirmModal';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

const App = () => {

  // Dimension variables
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [cubicYards, setCubicYards] = useState(0);
  const [totalCubicYards, setTotalCubicYards] = useState(0);
  const [displayCubicYards, setDisplayCubicYards] = useState(0);
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
    setDisplayCubicYards(fixedVolume); 
  }

  // Order form variables
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [typeOfPour, setTypeOfPour] = useState("");
  const [chloride, setChloride] = useState("");
  const [fiberMesh, setFiberMesh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [slump, setSlump] = useState("");
  const [waterContent, setWaterContent] = useState("");
  const [dateOfPour, setDateOfPour] = useState("");
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [placedOrder, setPlacedOrder] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  // Order and display logic
  const addOrder = () => {

    setPlacedOrder(
      {
        date: date,
        customer: customer,
        typeOfPour: typeOfPour,
        cubicYards: displayCubicYards,
        chloride: chloride,
        fiberMesh: fiberMesh,
        temperature: temperature,
        slump: slump,
        waterContent: waterContent,
        dateOfPour: dateOfPour,
        address: address,
        specialInstructions: specialInstructions
      }
    );
  };

  // Confirmation variables
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendOrders = async () => {

    const requestOptions = {
      headers: { 
        'Content-Type': 'application/json'
      },
      body: placedOrder
    };

    try {
      const data = await API.post('cvcorderapi', `/cvcorder`, requestOptions);
      console.log(data);
    } 
    catch (err) {
      console.error(err);
    };
  };

  // Call fetchOrders function when component loads
  useEffect(() => {
    // sendOrders()
  }, [])

  const fetchOrders = async () => {

    try {
      setLoading(true);
      const data = await API.get('cvcorderapi', `/cvcorder`);
      let list = Object.entries(data.orders);

      list.map((order, index) => {
        setOrders(
          orders.concat(order[1]) 
        );
      });

      setLoading(false);
    }
    catch (err) {
      console.error(err);
    };
  };

  const showVerifyModal = () => {
    setModalShow(true);
  }

  const onConfirmClick = async () => {

    setPlacedOrder(
      {
        date: date,
        customer: customer,
        typeOfPour: typeOfPour,
        cubicYards: displayCubicYards,
        chloride: chloride,
        fiberMesh: fiberMesh,
        temperature: temperature,
        slump: slump,
        waterContent: waterContent,
        dateOfPour: dateOfPour,
        address: address,
        specialInstructions: specialInstructions
      }
    );

    setModalShow(false);
    await sendOrders();
    fetchOrders();
    setConfirmModalShow(true);
    
  }

  const onCloseClick = () => {
    setConfirmModalShow(false);
  }

  return (

    <>
      <Container>
      <Row className="mb-2 mt-1">
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
        <Row className="pt-1">
        <Col>
          <input 
            type="radio" 
            id="wall" 
            name="options"
            value="Wall"
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
            value="Footing"
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
            value="Floor"
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
            value="Patio"
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
            className="mb-0 pr-2 pt-2 block-example border border-dark text-center"
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
      </div>

      <Row className="">
        <Col>
          <h4 className="mt-3">Entries:</h4>
        </Col>
        <Col className="pr-0">
          <Button 
            variant="primary" 
            size="m" 
            className="float-right mt-2 mb-2"
            onClick={
              () => {
                addDimension(width, height, length);
              }
            }
          >
            Enter New Dimension
          </Button>
        </Col>
      </Row>
      <Row className="block-example border border-dark">
        <Col className="mb-3 mt-3">
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
      <h4 className="mb-2">Order Form:</h4>
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
                value={typeOfPour} 
                placeholder="type of pour"
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
                placeholder="0.00"
                value={displayCubicYards}
                onChange={
                  e => setDisplayCubicYards(e.target.value)
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
        placedOrder={placedOrder}
        orders={orders}
        onConfirmClick={onConfirmClick}
      />

      <ConfirmModal 
        show={confirmModalShow} 
        orders={orders}
        loading={loading}
        onHide={
          () => setConfirmModalShow(false)
        }
        onCloseClick={onCloseClick}
      />
    
      <Row className="">
        <Col>
          {/* <h3 className="mb-3">Your Order Has Been Confirmed!</h3> */}
          {/* {
            orders.map((order, index) => (
              <div key={index}>
                <p><b>{order.name}</b> {order.symbol}</p>
              </div>
            ))
          } */}
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default App