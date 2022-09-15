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
        {/* <div className="row g-5"> */}
        <RecommendItem data={data} />
        {/* {data.map((val) => {
            let picBool = val.backdrop_path ? true : false;
            let pic = val.backdrop_path ? val.backdrop_path : val.poster_path;
            console.log("recommendation val=", val);
            return (
              <div
                key={shortid.generate()}
                className="col-md-4 col-sm-6 col-12"
              >
                <img
                  className={`w-100  ${!picBool ? "poster-path-img" : ""}`}
                  src={`${image_base_url}${pic}`}
                  alt="Poster Not Found"
                />
              </div>
            );
          })} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RecommendItems;
