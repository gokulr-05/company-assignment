import { useEffect, useState } from "react";
import "./row.css";
import { baseURL, image_base_url } from "../../../request";
import Spinner from "../spinner/Spinner";
import movieTrailer from "movie-trailer";
import shortid from "shortid";
import TrailerModal from "../modal/Modal";
import NotFoundModal from "../notFoundModal/NotFoundModal";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../slice/authSlice/authSlice";
import RecommendItemModal from "../../recommend/recommendItemModal/RecommendItemModal";

const Row = ({ title, url, isLarge }) => {
  let totalDataArr = useSelector((state, action) => {
    return state.authReducer.totalDataArr;
  });

  let dispatch = useDispatch();
  let youtube_base_url = "https://www.youtube.com/embed/";
  let [videoTitle, setVideoTitle] = useState("");
  let [videoURL, setVideoURL] = useState("");
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
    fetching();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      dispatch(authActions.addToTotalDataArr({ dataArr: [...movies] }));
    }
  }, [movies]);

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

      {/* <TrailerModal
        src={`${youtube_base_url}${videoURL}`}
        show={show}
        handleClose={handleClose}
      /> */}
      {/* <NotFoundModal show1={show1} handleClose1={handleClose1} /> */}
    </div>
  ) : (
    <Spinner />
  );
};

export default Row;
