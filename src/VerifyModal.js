import react from 'react';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const VerifyModal = (props) => {

    return (
      <BModal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            Whoa there cowpoke...
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <p>
            Are you sure you want to quit the game?
          </p>
        </BModal.Body>
        <BModal.Footer>
          <Button onClick={props.onQuit}>Yes</Button>
          <Button onClick={props.onHide}>No</Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default VerifyModal;