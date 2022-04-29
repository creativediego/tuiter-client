import { React, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * A popup modal that can be dismissed. Takes all content as props.
 * @param {boolean} show the show status of the modal
 * @param {string} title heading of the modal
 * @param {string} inputs body content
 * @param {boolan} withExternalButton if the modal should display an accompanying button that triggers its display
 * @param {string} externalButtonTitle the label of the external button
 * @param {string} size of the modal; sm, md, lg
 * @param {string} submitTitle label for the submit button at the bottom
 * @param {function} handleSubmit handles the button submit action
 */
const PopupModal = ({ props }) => {
  const { show, setShow, content, handleSubmit } = props;

  useEffect(() => {
    setShow(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return (
    <div>
      <Modal size={content.size} show={show} onHide={setShow}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content.body}</Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            className='rounded-pill'
            variant='primary'
            onClick={() => {
              handleSubmit();
            }}
          >
            {content.submitLabel}
            {/* <i className='fas fa-spinner fa-pulse'></i> */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupModal;
