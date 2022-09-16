import { useState } from "react";
import "./recommendItem.css";
import request, { baseURL, API_KEY, image_base_url } from "../../../request";
import shortid from "shortid";
import RecommendItemModal from "../recommendItemModal/RecommendItemModal";

const RecommendItem = ({ data }) => {
  let [show, setShow] = useState(false);
  let [dataVal, setDataVal] = useState(null);

  let handleShow = function () {
    setShow(true);
  };

  let handleClose = function () {
    setShow(false);
  };

  let clickHandler = function (dataObj) {
    setDataVal(dataObj);
    handleShow();
  };

  return (
    <div className="w-100 h-100">
      <div className="row g-5 m-0 w-100">
        {data.map((val) => {
          let title = val.original_name
            ? val.original_name
            : val.original_title
            ? val.original_title
            : val.title
            ? val.title
            : "Not Found";
          let picBool = val.backdrop_path ? true : false;
          let pic = val.backdrop_path ? val.backdrop_path : val.poster_path;

          let dataObj = {
            pic: pic,
            picBool: picBool,
            title: title,
            description: val.overview,
          };
          return (
            <div
              key={shortid.generate()}
              className="col-md-4 col-sm-6 col-12 pointer-cursor scaling pad-1 "
              onClick={() => {
                clickHandler(dataObj);
              }}
            >
              <div className="w-100 h-100">
                <img
                  className={`w-100 image-item-perfect  ${
                    !picBool ? "poster-path-img" : ""
                  }`}
                  src={`${image_base_url}${pic}`}
                  alt="Poster Not Found"
                />
              </div>
            </div>
          );
        })}
      </div>
      <RecommendItemModal
        show={show}
        handleClose={handleClose}
        data={dataVal}
      />
    </div>
  );
};

export default RecommendItem;
