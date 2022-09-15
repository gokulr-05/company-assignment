import React, { useState, useEffect } from "react";
import request, { baseURL, API_KEY, image_base_url } from "../../../request";
import "./recommendItems.css";
import Spinner from "../../../pages/component/spinner/Spinner";
import shortid from "shortid";
import RecommendItemModal from "../recommendItemModal/RecommendItemModal";
import RecommendItem from "../recommendItem/RecommendItem";

let obj = {
  "action movies": request.fetchActionMovies,
  "top rated": request.fetchTopRated,
  "comedy movies": request.fetchComedyMovies,
  "horror movies": request.fetchHorrorMovies,
  documentaries: request.fetchDocumantaries,
  "thriller movies": request.fetchNetflixOriginals,
};

const RecommendItems = ({ name }) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    async function asyncFetch() {
      let url = `${baseURL}${obj[name.toLowerCase()]}`;

      let res = await fetch(url);
      let value1 = await res.json();

      setData(value1.results);
    }
    asyncFetch();
  }, []);

  if (data === null) {
    return <Spinner />;
  }

  return (
    <div className="recommendItem-area my-5">
      <div className="recommendItem-sec">
        <h1 className="mb-5">{name}</h1>
        <RecommendItem data={data} />
      </div>
    </div>
  );
};

export default RecommendItems;
