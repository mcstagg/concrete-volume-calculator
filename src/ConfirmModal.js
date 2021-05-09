import react from 'react';
import { API } from 'aws-amplify';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

const ConfirmModal = (props) => {

    let orders = props.orders;
    let loading = props.loading;

    return (
      <BModal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            Order Status...
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <Container>
          <Row>
          <Col className="block-example border border-dark pl-3 pt-2">
          
          <Row className="">
          <Col>
          {loading && <h2>Loading...</h2>}
          {
            !loading &&  
            orders.map((order, index) => (
              <div key={index}>
                <p>{index} <b>Date: </b>{order.date}</p>
                <p>{index} <b>Customer: </b>{order.customer}</p>
                <p>{index} <b>Type of Pour: </b>{order.typeOfPour}</p>
                <p>{index} <b>Cubic Yards: </b>{order.cubicYards}</p>
                <p>{index} <b>Chloride: </b>{order.chloride}</p>
                <p>{index} <b>Fiber Mesh: </b>{order.fiberMesh}</p>
                <p>{index} <b>Temperature: </b>{order.temperature}</p>
                <p>{index} <b>Slump: </b>{order.slump}</p>
                <p>{index} <b>Water Content: </b>{order.waterContent}</p>
                <p>{index} <b>Date of Pour: </b>{order.dateOfPour}</p>
                <p>{index} <b>Address: </b>{order.address}</p>
                <p>{index} <b>Special Instructions: </b>{order.specialInstructions}</p>
              </div>
            ))
          }
          </Col>
          </Row>

          </Col>
          </Row>
          </Container>
        </BModal.Body>
        <BModal.Footer>
          <Button onClick={props.onCloseClick}>Close</Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default ConfirmModal;