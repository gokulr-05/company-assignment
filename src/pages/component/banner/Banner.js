import { useEffect, useState } from "react";
import "./banner.css";
import request from "../../../request";
import { baseURL, image_base_url } from "../../../request";
import Spinner from "../spinner/Spinner";

const Banner = () => {
  let [showHeader, setShowHeader] = useState(false);
  let [image, setImage] = useState("");
  let [movies, setMovies] = useState("");

  let overview =
    movies?.overview?.length > 250
      ? movies?.overview?.slice(0, 250).concat("...")
      : movies?.overview;

  useEffect(() => {
    let fetching = async () => {
      let response = await fetch(`${baseURL}${request.fetchNetflixOriginals}`);
      let data = await response.json();
      let random_val = await Math.floor(
        Math.random() * (data.results.length - 1)
      );
      setMovies(data.results[random_val]);
      setImage(`${image_base_url}${data.results[random_val].backdrop_path}`);
    };
    fetching();
  }, []);

  return (
    <div>
      {image !== "" ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="background-img"
        >
          <div className="banner-mask">
            <div className="movie-details">
              <h2 className="movie-title">{movies?.name}</h2>

              <div className="pe-3">
                <strong>{overview}</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Banner;
