import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';
import truck from './truck.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyModal from './VerifyModal';
import ConfirmModal from './ConfirmModal';
import { Row, Col, Container, Form, Button, Table } from 'react-bootstrap';

const App = () => {

  // Dimension variables
  const [width, setWidth] = useState(0);
  const [widthInInches, setWidthInInches] = useState(0);
  const [widthInFeet, setWidthInFeet] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightInInches, setHeightInInches] = useState(0);
  const [heightInFeet, setHeightInFeet] = useState(0);
  const [length, setLength] = useState(0);
  const [lengthInInches, setLengthInInches] = useState(0);
  const [lengthInFeet, setLengthInFeet] = useState(0);
  const [leftoverHeight, setLeftoverHeight] = useState(0);
  const [leftoverWidth, setLeftoverWidth] = useState(0);
  const [leftoverLength, setLeftoverLength] = useState(0);

  const [cubicYards, setCubicYards] = useState(0);
  const [totalCubicYards, setTotalCubicYards] = useState(0);
  const [displayCubicYards, setDisplayCubicYards] = useState(0);
  const [entries, setEntries] = useState([]);

  // Order form variables
  const [orderDate, setOrderDate] = useState("");
  const [dateOfPour, setDateOfPour] = useState("");
  const [customer, setCustomer] = useState("");
  const [timeOfPour, setTimeOfPour] = useState("");
  const [typeOfPour, setTypeOfPour] = useState("");
  const [temperature, setTemperature] = useState("60");
  const [slump, setSlump] = useState("1 in");
  const [fiberMesh, setFiberMesh] = useState("No");
  const [chloride, setChloride] = useState("0%");
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [placedOrder, setPlacedOrder] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  // Confirmation variables
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  let order;

  // Dimension and display logic
  // Handles the add dimension event upon add new dimension button click
  const addDimension = (heightInInches, heightInFeet, widthInInches, widthInFeet, lengthInInches, lengthInFeet) => {

    let heightToInches = 0;
    let widthToInches = 0;
    let lengthToInches = 0;
    let totalHeight = 0;
    let totalWidth = 0;
    let totalLength = 0; 

    heightToInches = heightInFeet * 12;
    widthToInches = widthInFeet * 12;
    lengthToInches = lengthInFeet * 12;

    totalHeight = parseInt(heightInInches) + parseInt(heightToInches);
    totalWidth = parseInt(widthInInches) + parseInt(widthToInches);
    totalLength = parseInt(lengthInInches) + parseInt(lengthToInches);

    let cubicInches = totalHeight * totalWidth * totalLength;
    let inchesInYards = 46656;
    let volume = (cubicInches / inchesInYards);
    calculateTotalCubicYards(volume);
    setCubicYards(Number(volume.toFixed(2)));

    totalHeight = (totalHeight / 12);
    totalWidth = (totalWidth / 12);
    totalLength = (totalLength / 12);

    let heightFt = totalHeight.toFixed(0);
    let widthFt = totalWidth.toFixed(0);
    let lengthFt = totalLength.toFixed(0);
    
    setHeight(heightFt);
    setWidth(widthFt);
    setLength(lengthFt);

    let heightIn = (totalHeight % 1).toFixed(2);
    let widthIn = (totalWidth % 1).toFixed(2);
    let lengthIn = (totalLength % 1).toFixed(2);

    setLeftoverHeight(heightIn);
    setLeftoverWidth(widthIn);
    setLeftoverLength(lengthIn);

    setEntries(
      entries.concat({
        height: height,
        heightIn: leftoverHeight,
        width: width,
        widthIn: leftoverWidth,
        length: length,
        lengthIn: leftoverLength,
        cubicYards: volume.toFixed(2)
      })
    );
  };

  const clearDimensions = () => {
    setEntries(
      entries.concat({})
    )
  }

  const calculateTotalCubicYards = (volume) => {
    let total = totalCubicYards;
    let totalVolume = (total += volume);
    let fixedVolume = Number(totalVolume.toFixed(2));
    setTotalCubicYards(fixedVolume);
    setDisplayCubicYards(fixedVolume); 
  }

  // Order and display logic
  const addOrder = () => {

    setPlacedOrder(
      {
        orderDate: orderDate,
        dateOfPour: dateOfPour,
        customer: customer,
        timeOfPour: timeOfPour,
        cubicYards: displayCubicYards,
        typeOfPour: typeOfPour,
        temperature: temperature,
        slump: slump,
        fiberMesh: fiberMesh,
        chloride: chloride,
        dateOfPour: dateOfPour,
        address: address,
        specialInstructions: specialInstructions
      }
    );
  };

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
      setOrders(data.orders);
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
        orderDate: orderDate,
        dateOfPour: dateOfPour,
        customer: customer,
        timeOfPour: timeOfPour,
        cubicYards: displayCubicYards,
        typeOfPour: typeOfPour,
        temperature: temperature,
        slump: slump,
        fiberMesh: fiberMesh,
        chloride: chloride,
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
          <h1 className="text-center cvc">
            <u>Concrete Volume Calculator</u>
          </h1>
        </Col>
      </Row>
      
      <Row className="text-center">
        <Col>
          <h4>
            <i>Enter Your Details Below:</i>
          </h4>
        </Col>
      </Row>

      <Row className="pt-1 text-center">
        <Col className="pl-0 pr-0">
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
        <Col className="pl-0 pr-0">
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
        <Col className="pl-0 pr-0">
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
        <Col className="pl-0 pr-0">
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
            htmlFor="patio" 
            className="pl-2"
          >
            Patio
          </label>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>New Dimension:</h4>
        </Col>
      </Row>
          
      <Row 
        className="pb-2 pt-1 pl-0 pr-0 block-example border border-dark text-center"
      >
        <Col className="mb-0">
          <Form.Group className="mb-0">
            <Row className="">
              <Col>
                <Form.Label 
                  htmlFor="height" 
                  className="mb-0"
                >
                  <b>Height</b>
                </Form.Label>
              </Col>
            </Row>
            <Row className="mb-0 text-left">
              <Col className="">
                <Form.Control 
                  type="text" 
                  id="height" 
                  placeholder="feet"
                  className=""
                  value={heightInFeet} 
                  onChange={
                    e => setHeightInFeet(e.target.value)
                  } 
                />
              </Col>
              <Col>
                <Form.Label 
                  htmlFor="height" 
                  className="mb-0 pb-0"
                >
                  <p className="mb-0">Feet</p>
                </Form.Label>
              </Col>
            </Row>
            <Row className="mt-0 pt-0 text-left">
              <Col className="mt-0">
                <Form.Control 
                  type="text" 
                  id="height" 
                  placeholder="inches"
                  className=""
                  value={heightInInches} 
                  onChange={
                    e => setHeightInInches(e.target.value)
                  } 
                />
              </Col>
              <Col className="">
                <Form.Label 
                  htmlFor="height" 
                  className="mb-0 pb-0"
                >
                  <p className="mb-0">Inches</p>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col className="mb-0">
          <Form.Group className="mb-0">
            <Row>
              <Col>
                <Form.Label 
                  htmlFor="width" 
                  className="mb-0"
                >
                  <b>Width</b>
                </Form.Label>
              </Col>
            </Row>
            <Row className="text-left">
              <Col>
                <Form.Control 
                  type="text" 
                  id="width" 
                  className=""
                  placeholder="feet"
                  value={widthInFeet} 
                  onChange={
                    e => setWidthInFeet(e.target.value)
                  }
                />
              </Col>
              <Col>
                <Form.Label 
                  htmlFor="width" 
                  className="mb-0 pb-0"
                >
                  <p className="mb-0">Feet</p>
                </Form.Label>
              </Col>
            </Row>
            <Row className="text-left">
              <Col>
              <Form.Control 
                type="text" 
                id="width" 
                className=""
                placeholder="inches"
                value={widthInInches} 
                onChange={
                  e => setWidthInInches(e.target.value)
                }
              />
              </Col>
              <Col className="">
                <Form.Label 
                  htmlFor="width" 
                  className="mb-0"
                >
                  <p className="mb-0">Inches</p>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
        </Col>

        <Col className="mb-0">
          <Form.Group className="mb-0">
            <Row>
              <Col>
                <Form.Label 
                  htmlFor="length" 
                  className="mb-0"
                >
                  <b>Length</b>
                </Form.Label>
              </Col>
            </Row>
            <Row className="text-left">
              <Col>
                <Form.Control 
                  type="text" 
                  id="length" 
                  placeholder="feet"
                  value={lengthInFeet} 
                  onChange={
                    e => setLengthInFeet(e.target.value)
                  }  
                />
              </Col>
              <Col>
                <Form.Label 
                  htmlFor="length" 
                  className="mb-0 pb-0"
                >
                  <p className="mb-0">Feet</p>
                </Form.Label>
              </Col>
            </Row>
            <Row className="text-left">
              <Col>
                <Form.Control 
                  type="text" 
                  id="length" 
                  placeholder="inches"
                  value={lengthInInches} 
                  onChange={
                    e => setLengthInInches(e.target.value)
                  }  
                />
              </Col>
              <Col className="">
                <Form.Label 
                  htmlFor="length" 
                  className="mb-0"
                >
                  <p className="mb-0">Inches</p>
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

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
                addDimension(heightInInches, heightInFeet, widthInInches, widthInFeet, lengthInInches, lengthInFeet);
              }
            }
          >
            Enter New Dimension
          </Button>
        </Col>
      </Row>

      <Row className="block-example text-center">
        <Col className="p-0">
          <Table className="mb-0">
          <thead>
          <tr>
          <th className="border border-dark">Height</th>
          <th className="border border-dark">Width</th>
          <th className="border border-dark">Length</th>
          <th className="border border-dark">Cubic Yards</th>
          </tr>
          </thead>
          <tbody>
          {
            entries.map(
              (entry, index) => (
                  <tr key={index}>
                  <td className="pl-2 pt-1 pr-1 pb-1 border border-dark">
                  <b>{entry.height}</b> ft. <b>{entry.heightIn}</b> in.
                  </td>
                  <td className="pl-2 pt-1 pr-0 pb-1 border border-dark">
                  <b>{entry.width}</b> ft. <b>{entry.widthIn}</b> in.
                  </td>
                  <td className="pl-2 pt-1 pr-0 pb-1 border border-dark">
                  <b>{entry.length}</b> ft. <b>{entry.lengthIn}</b> in.
                  </td>
                  <td className="p-1 border border-dark">
                  <b>{entry.cubicYards}</b>
                  </td>
                  </tr>
              )
            )
          }
          </tbody>
          </Table>
        </Col>
      </Row>
      <Row 
        className="pt-3 mb-3 block-example border-left border-bottom border-right border-dark"
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
      <Row>
        <Col>
          <h4 className="mb-2">Order Form:</h4>
        </Col>
      </Row>

      <Row className="pt-3 pb-1 mb-3 block-example border border-dark">
        <Col>
          <Form.Group>
          <Col>
          <Row className="mx-auto">
            <Col className="mb-0">
              <Form.Label htmlFor="date">
                <b>Order Date:</b>
              </Form.Label>
              <Form.Control 
                type="date" 
                id="date" 
                name="dates" 
                placeholder="MM/DD/YY"
                onChange={
                  e => setOrderDate(e.target.value)
                }
              />
            </Col>
            <Col> 
              <Form.Label htmlFor="pourDate">
                <b>Date of Pour:</b>
              </Form.Label>
              <Form.Control 
                type="date" 
                id="pour" 
                name="pourDate" 
                placeholder="MM/DD/YY"
                onChange={
                  e => setDateOfPour(e.target.value)
                } 
              />
            </Col>
          </Row>
          <Row className="mx-auto">
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
            <Col> 
              <Form.Label htmlFor="timeOfPour">
                <b>Time of Pour:</b>
              </Form.Label>
              <Form.Control 
                type="time" 
                id="time" 
                name="timeOfPour" 
                placeholder="12:00pm"
                onChange={
                  e => setTimeOfPour(e.target.value)
                } 
              />
            </Col>
          </Row>
          <Row className="mx-auto">
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
          </Row>
          <Row className="mx-auto">
            <Col>
            <Form.Label htmlFor="temp">
              <b>Temperature: (F)</b>
            </Form.Label>
            <Form.Control 
              as="select" 
              id="temp" 
              name="temperature" 
              placeholder="temp"
              onInput={
                e => setTemperature(e.target.value)
              } 
            >
              <option>60</option>
              <option>65</option>
              <option>70</option>
              <option>75</option>
              <option>80</option>
            </Form.Control>
            </Col>
            <Col>
              <Form.Label htmlFor="slump">
                <b>Slump:</b>
              </Form.Label>
              <Form.Control 
                as="select" 
                id="slump" 
                name="slumpin" 
                placeholder="slump"
                onChange={
                  e => setSlump(e.target.value)
                } 
              >
                <option>1 in</option>
                <option>2 in</option>
                <option>3 in</option>
                <option>4 in</option>
                <option>5 in</option>
              </Form.Control>
            </Col>
          </Row> 
          <Row className="mx-auto">
            <Col>
              <Form.Label htmlFor="fiber">
                <b>Fiber Mesh:</b>
              </Form.Label>
              <Form.Control 
                as="select" 
                id="fiber" 
                name="fibermesh" 
                placeholder="fiber mesh"
                onChange={
                  e => setFiberMesh(e.target.value)
                } 
              >
                <option>No</option>
                <option>Yes</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label htmlFor="chloride">
                <b>Chloride:</b>
              </Form.Label>
              <Form.Control
                as="select"
                id="chloride" 
                name="chloridecontent" 
                placeholder="chloride"
                onChange={
                  e => setChloride(e.target.value)
                }
              > 
                <option>0%</option>
                <option>1%</option>
                <option>2%</option>
                <option>3%</option>
              </Form.Control>   
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col>    
              <Form.Label htmlFor="address">
                <b>Job Site Address:</b>
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
    
      </Container>
    </>
  );
}

export default App