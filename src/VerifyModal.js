import react from 'react';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function VerifyModal() {

    return (
      <BModal>
        <BModal.Header>
          <BModal.Title>
            Whoe caused the jenga?!
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <p>
            Please select the culprit.
          </p>

          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </BModal.Body>
        <BModal.Footer>
          <Button></Button>
        </BModal.Footer>
      </BModal>
    );
  }

  export default verifyModal;