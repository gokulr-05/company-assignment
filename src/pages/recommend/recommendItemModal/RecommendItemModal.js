import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import shortid from "shortid";
import request, { baseURL, API_KEY, image_base_url } from "../../../request";
import "./recommendationModal.css";

function RecommendItemModal({ show, handleClose, data }) {
  console.log("data in modal=", data);
  return (
    <>
      <Modal
        scrollable={true}
        size="xl"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Body>
          <div className="recommend-modal-container">
            <div className="recommend-modal-img-container">
              <img
                className="recommend-modal-img"
                src={`${image_base_url}${data?.pic}`}
                alt="not found"
              />
            </div>

            <div className="recommend-data-field-container">
              <h5 className="text-dark text-center text-white m-0">Title:</h5>
              <h6 className="text-dark text-center text-white m-0">
                {data?.title}
              </h6>
            </div>
            <div className="recommend-data-field-container">
              <h5 className="text-dark text-center text-white m-0">
                Description:
              </h5>
              <p className="text-dark text-center text-white m-0">
                {/* {data?.description?.length > 200
                  ? data?.description.slice(0, 200)
                  : data?.description} */}

                {data?.description}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RecommendItemModal;
