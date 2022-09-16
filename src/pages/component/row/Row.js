import { useEffect, useState } from "react";
import "./row.css";
import { baseURL, image_base_url } from "../../../request";
import Spinner from "../spinner/Spinner";

import shortid from "shortid";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../slice/authSlice/authSlice";
import RecommendItemModal from "../../recommend/recommendItemModal/RecommendItemModal";

const Row = ({ title, url, isLarge }) => {
  let totalDataArr = useSelector((state, action) => {
    return state.authReducer.totalDataArr;
  });

  let [isError, setIsError] = useState(false);

  let dispatch = useDispatch();

  let height = isLarge ? "large-height" : "small-height";

  let [dataVal, setDataVal] = useState(null);

  let [movies, setMovies] = useState([]);

  let [show, setShow] = useState(false);

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

  useEffect(() => {
    let fetching = async () => {
      let response = await fetch(url);
      let data = await response.json();

      setMovies(data.results);
    };

    try {
      fetching();
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }, []);

  if (isError === true) {
    return <h1 className="my-5">Something went wrong</h1>;
  }

  return movies?.length > 0 ? (
    <div className="row-area ">
      <div className="row-sec ">
        <h2 className="m-0">{title}</h2>
        <div className="row-1  ps-3">
          {movies.map((val, ind, arr) => {
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
                onClick={() => {
                  clickHandler(dataObj);
                }}
                key={ind}
                className={`row-1-img-container ${height} `}
              >
                <img
                  className="row-1-img"
                  key={ind}
                  src={`${image_base_url}${pic}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      <RecommendItemModal
        show={show}
        handleClose={handleClose}
        data={dataVal}
      />
    </div>
  ) : (
    <Spinner />
  );
};

export default Row;
