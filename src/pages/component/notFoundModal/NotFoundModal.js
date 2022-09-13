import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import shortid from "shortid";

function NotFoundModal({ show1, handleClose1 }) {
  return (
    <>
      <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Body>
          <h2 className="text-black text-center">Trailer Link Not Found</h2>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NotFoundModal;
