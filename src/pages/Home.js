import React from "react";
import "./home.css";
import request from "../request";
import { baseURL } from "../request";
import Row from "./component/row/Row";
import Banner from "./component/banner/Banner";

const Home = () => {
  return (
    <div className="home-area">
      <div className="home-sec">
        <Banner />
        <Row
          title="Netflix Original"
          url={`${baseURL}${request.fetchNetflixOriginals}`}
          isLarge={true}
        />
        <Row
          title="Top Rated"
          url={`${baseURL}${request.fetchTopRated}`}
          isLarge={false}
        />
        <Row
          isLarge={false}
          title="Action Movies"
          url={`${baseURL}${request.fetchActionMovies}`}
        />
        <Row
          isLarge={false}
          title="Comedy Movies"
          url={`${baseURL}${request.fetchComedyMovies}`}
        />
        <Row
          isLarge={false}
          title="Horror Movies"
          url={`${baseURL}${request.fetchHorrorMovies}`}
        />
        <Row
          isLarge={false}
          title="Romance Movies"
          url={`${baseURL}${request.fetchRomanceMovies}`}
        />
        <Row
          isLarge={false}
          title="Documentaries"
          url={`${baseURL}${request.fetchDocumantaries}`}
        />
      </div>
    </div>
  );
};

export default Home;
