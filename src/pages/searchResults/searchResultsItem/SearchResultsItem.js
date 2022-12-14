import { useState } from "react";
import "./searchResultsItem.css";
import request, { baseURL, API_KEY, image_base_url } from "../../../request";
import shortid from "shortid";
import RecommendItemModal from "../../recommend/recommendItemModal/RecommendItemModal";

const SearchResultsItem = ({ data }) => {
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
    <div>
      <div className="row g-5">
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
              className="col-md-4 col-sm-6 col-12 pointer-cursor scaling"
              onClick={() => {
                clickHandler(dataObj);
              }}
            >
              <img
                className={`w-100  ${!picBool ? "poster-path-img" : ""}`}
                src={`${image_base_url}${pic}`}
                alt="Poster Not Found"
              />
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

export default SearchResultsItem;
