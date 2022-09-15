import React from "react";
import "./recommend.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import shortid from "shortid";
import RecommendItems from "./recommendItems/RecommendItems";

const Recommend = () => {
  let logindata = useSelector((state, action) => {
    return state.authReducer.loginData;
  });
  let recommendationList = useSelector((state) => {
    return state.authReducer.recommendationList;
  });
  let isLoggedIn = useSelector((state, action) => {
    return state.authReducer.isLoggedIn;
  });
  return (
    <div className="recommend-list-area">
      <div className="recommend-list-sec">
        {isLoggedIn === true ? (
          <div>
            {recommendationList.length === 0 ? (
              <div>
                {" "}
                <h4 className="text-center text-muted">
                  Your recommendation list is empty!!
                </h4>
                <p className="text-center text-muted">
                  Please go and set your recommendation list!!
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    to="/customize"
                    className=" btn btn-primary text-center"
                  >
                    Set Recommendation
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="recommend-list-container">
              {recommendationList.map((val, ind) => {
                return (
                  <h5 key={shortid.generate()} className="text-center">
                    <RecommendItems name={val} />
                  </h5>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 className="text-center">
            {" "}
            Please Login to view recommendation List
          </h1>
        )}
      </div>
    </div>
  );
};

export default Recommend;
