import react from 'react';
import { API } from 'aws-amplify';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

const ConfirmModal = (props) => {

    let orders = props.orders;

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
          <h3 className="mb-3 pt-2 pl-1">Your Order Has Been Confirmed!</h3>
          {
            // orders.map((order, index) => (
            //   <div key={index}>
            //     <p><b>{order.name}</b> {order.symbol}</p>
            //   </div>
            // ))
          }
          </Col>
          </Row>

          </Col>
          </Row>
          </Container>
        </BModal.Body>
        <BModal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default ConfirmModal;