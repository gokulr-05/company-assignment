import React, { useState, useEffect } from "react";
import request, { baseURL, API_KEY, image_base_url } from "../../../request";
import "./recommendItems.css";
import Spinner from "../../../pages/component/spinner/Spinner";

let obj = {
  "action movies": request.fetchActionMovies,
  "top rated": request.fetchTopRated,
  "comedy movies": request.fetchComedyMovies,
  "horror movies": request.fetchHorrorMovies,
  documentaries: request.fetchDocumantaries,
  "thriller movies": request.fetchNetflixOriginals,
};

const RecommendItems = ({ name }) => {
  console.log("name=", name);
  let [data, setData] = useState(null);

  useEffect(() => {
    async function asyncFetch() {
      let url = `${baseURL}${obj[name.toLowerCase()]}`;
      console.log("url=", url);
      let res = await fetch(url);
      let value1 = await res.json();
      console.log("value1=", value1);
      setData(value1.results);
      // console.log("res=", res);
    }
    asyncFetch();
  }, []);

  if (data === null) {
    return <Spinner />;
  }

  return (
    <div className="recommendItem-area">
      <div className="recommendItem-sec">
        <h1>{name}</h1>
        <div className="row g-5">
          {data.map((val) => {
            return (
              <div className="col-md-4 col-sm-6 col-12">
                <img
                  className="w-100"
                  src={`${image_base_url}${val.backdrop_path}`}
                  alt="Poster Not Found"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendItems;
