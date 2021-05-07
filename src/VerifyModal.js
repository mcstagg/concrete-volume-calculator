import { react, useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

const VerifyModal = (props) => {

    let order = props.entries;
    console.log(order);

    let date;
    let customer;
    let typeOfPour;
    let cubicYards;
    let chloride;
    let fiberMesh;
    let temperature;
    let slump;
    let waterContent;
    let dateOfPour;
    let address;
    let specialInstructions;

    order.map(item => {
      console.log(item.date);
      date = item.date;
      customer = item.customer;
      typeOfPour = item.typeOfPour;
      cubicYards = item.cubicYards;
      chloride = item.chloride;
      fiberMesh = item.fiberMesh;
      temperature = item.temperature;
      slump = item.slump;
      waterContent = item.waterContent;
      dateOfPour = item.dateOfPour;
      address = item.address;
      specialInstructions = item.specialInstructions;
    });

    return (
      <BModal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            Confirm Your Order Details...
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <Container>
          <Row>
          <Col className="block-example border border-dark pl-3 pt-2">
          {
            <>
            <p><b>Date: </b>{date}</p>
            <p><b>Customer: </b>{customer}</p>
            <p><b>Type Of Pour: </b>{typeOfPour}</p>
            <p><b>Cubic Yards: </b>{cubicYards}</p>
            <p><b>Chloride: </b>{chloride}</p>
            <p><b>Fiber Mesh: </b>{fiberMesh}</p>
            <p><b>Temperature: </b>{temperature}</p>
            <p><b>Slump: </b>{slump}</p>
            <p><b>WaterContent: </b>{waterContent}</p>
            <p><b>Date of Pour: </b>{dateOfPour}</p>
            <p><b>Address: </b>{address}</p>
            <p><b>Special Instructions: </b>{specialInstructions}</p>
            </>
          }
          </Col>
          </Row>
          </Container>
        </BModal.Body>
        <BModal.Footer>
          <Button onClick={props.onHide}>Edit Order</Button>
          <Button onClick={props.onConfirmClick}>Confirm Order</Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default VerifyModal;