import { useEffect, useState } from "react";
import "./row.css";
import { baseURL, image_base_url } from "../../../request";
import Spinner from "../spinner/Spinner";
import movieTrailer from "movie-trailer";
// import ReactPlayer from "react-player";
import shortid from "shortid";
import TrailerModal from "../modal/Modal";
import NotFoundModal from "../notFoundModal/NotFoundModal";

const Row = ({ title, url, isLarge }) => {
  let youtube_base_url = "https://www.youtube.com/embed/";
  let [videoTitle, setVideoTitle] = useState("");
  let [videoURL, setVideoURL] = useState("");
  let height = isLarge ? "large-height" : "small-height";

  let [movies, setMovies] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleShow1 = () => {
    setShow1(true);
  };

  useEffect(() => {
    let fetching = async () => {
      let response = await fetch(url);
      let data = await response.json();

      setMovies(data.results);
    };
    fetching();
  }, []);

  let clickHandler = (movie_title) => {
    let fetchURL = async (movie_title) => {
      try {
        let response = await movieTrailer(movie_title);
        // console.log("response=", response);
        let url_id = await new URLSearchParams(new URL(response).search);
        await setVideoURL(url_id.get("v"));
        await handleShow();
        // console.log("try");
      } catch (err) {
        // console.log("error occured: Trailer Link Not Found");
        handleShow1();
        // console.log("catch");
      }
    };

    fetchURL(movie_title);
  };

  return movies?.length > 0 ? (
    <div className="row-area ">
      <div className="row-sec ">
        <h2 className="m-0">{title}</h2>
        <div className="row-1  ps-3">
          {movies.map((val, ind, arr) => {
            return (
              <div
                onClick={() => {
                  clickHandler(val.name || val.title);
                }}
                key={ind}
                className={`row-1-img-container ${height} `}
              >
                <img
                  className="row-1-img"
                  key={ind}
                  src={`${image_base_url}${
                    isLarge ? val.poster_path : val.backdrop_path
                  }`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      <TrailerModal
        src={`${youtube_base_url}${videoURL}`}
        show={show}
        handleClose={handleClose}
      />
      <NotFoundModal show1={show1} handleClose1={handleClose1} />
    </div>
  ) : (
    <Spinner />
  );
};

export default Row;
