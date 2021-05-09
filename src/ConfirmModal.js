import react from 'react';
import { API } from 'aws-amplify';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

const ConfirmModal = ({orders, loading, onCloseClick, ...props}) => {

    let order = orders[orders.length - 1];

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
            !loading && order && 
            (
              <div>
                <p><b>Date: </b>{order.date}</p>
                <p><b>Customer: </b>{order.customer}</p>
                <p><b>Type of Pour: </b>{order.typeOfPour}</p>
                <p><b>Cubic Yards: </b>{order.cubicYards}</p>
                <p><b>Chloride: </b>{order.chloride}</p>
                <p><b>Fiber Mesh: </b>{order.fiberMesh}</p>
                <p><b>Temperature: </b>{order.temperature}</p>
                <p><b>Slump: </b>{order.slump}</p>
                <p><b>Water Content: </b>{order.waterContent}</p>
                <p><b>Date of Pour: </b>{order.dateOfPour}</p>
                <p><b>Address: </b>{order.address}</p>
                <p><b>Special Instructions: </b>{order.specialInstructions}</p>
              </div>
            )
          }
          </Col>
          </Row>

          </Col>
          </Row>
          </Container>
        </BModal.Body>
        <BModal.Footer>
          <Button onClick={onCloseClick}>Close</Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default ConfirmModal;