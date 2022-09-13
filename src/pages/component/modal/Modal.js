import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import shortid from "shortid";

function TrailerModal({ show, setShow, handleClose, handleShow, src }) {
  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <iframe
            title={shortid.generate()}
            width="100%"
            height="400px"
            src={src}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TrailerModal;
