import { useEffect, useState } from "react";
import "./row.css";
import { baseURL, image_base_url } from "../../../request";
import Spinner from "../spinner/Spinner";
import movieTrailer from "movie-trailer";
// import ReactPlayer from "react-player";
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
  console.log("totalDataArr=", totalDataArr);
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

  // const [show, setShow] = useState(false);
  // const [show1, setShow1] = useState(false);

  // *************original start****************

  // const handleClose = () => setShow(false);
  // const handleClose1 = () => setShow1(false);

  // const handleShow = () => {
  //   setShow(true);
  // };
  // const handleShow1 = () => {
  //   setShow1(true);
  // };

  // *************original end****************
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

  // let clickHandler = (movie_title) => {
  //   let fetchURL = async (movie_title) => {
  //     try {
  //       let response = await movieTrailer(movie_title);
  //       // console.log("response=", response);
  //       let url_id = await new URLSearchParams(new URL(response).search);
  //       await setVideoURL(url_id.get("v"));
  //       await handleShow();
  //       // console.log("try");
  //     } catch (err) {
  //       // console.log("error occured: Trailer Link Not Found");
  //       handleShow1();
  //       // console.log("catch");
  //     }
  //   };

  //   fetchURL(movie_title);
  // };

  return movies?.length > 0 ? (
    <div className="row-area ">
      <div className="row-sec ">
        <h2 className="m-0">{title}</h2>
        <div className="row-1  ps-3">
          {movies.map((val, ind, arr) => {
            // console.log("val in Row js=", val);

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
                // onClick={() => {
                //   clickHandler(val.name || val.title);
                // }}
                key={ind}
                className={`row-1-img-container ${height} `}
              >
                {/* <img
                  className="row-1-img"
                  key={ind}
                  src={`${image_base_url}${
                    isLarge ? val.poster_path : val.backdrop_path
                  }`}
                  alt=""
                /> */}
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
