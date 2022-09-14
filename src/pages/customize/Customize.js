import React from "react";
import "./customize.css";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "./ListItem";
import shortid from "shortid";
import { authActions } from "../../slice/authSlice/authSlice";

const Customize = () => {
  let dispatch = useDispatch();
  let list = useSelector((state, action) => {
    return state.authReducer.list;
  });
  let recommendationList = useSelector((state, action) => {
    return state.authReducer.recommendationList;
  });
  let recommendationListUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/recommendationList.json";

  let addListData = function (name, ind) {
    dispatch(authActions.addDataToList({ index: ind }));
  };
  let addRecommendationListData = function (name, ind) {
    dispatch(authActions.addDataToRecommendationList({ index: ind }));
  };

  return (
    <div className="customize-list-area">
      <div className="customize-list-sec">
        <h1 className="text-center">List</h1>
        {list.map((val, ind, arr) => {
          return (
            <h4 className="text-center">
              <ListItem
                clickHandlerFunc={addRecommendationListData}
                name="list"
                ind={ind}
                key={shortid.generate()}
                item={val}
              />
            </h4>
          );
        })}
        <h1 className="text-center mt-5">Recommendation List</h1>
        {recommendationList.map((val, ind, arr) => {
          return (
            <h4 className="text-center">
              <ListItem
                clickHandlerFunc={addListData}
                name="recommendationList"
                ind={ind}
                key={shortid.generate()}
                item={val}
              />
            </h4>
          );
        })}
      </div>
    </div>
  );
};

export default Customize;
