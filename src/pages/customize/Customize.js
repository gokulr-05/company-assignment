import { useEffect, useState } from "react";
import "./customize.css";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "./ListItem";
import shortid from "shortid";
import { authActions } from "../../slice/authSlice/authSlice";

const Customize = () => {
  let dispatch = useDispatch();
  // let [uniqueUserId, setUniqueUserId] = useState(null);
  let logindata = useSelector((state, action) => {
    return state.authReducer.loginData;
  });

  console.log("logindata=", logindata);

  // if (logindata !== null) {
  //   // setUniqueUserId(logindata.userId);

  // }

  let isLoggedIn = useSelector((state, action) => {
    return state.authReducer.isLoggedIn;
  });
  let list = useSelector((state, action) => {
    return state.authReducer.list;
  });
  let recommendationList = useSelector((state, action) => {
    return state.authReducer.recommendationList;
  });
  console.log("list=", list);
  console.log("recommendationList=", recommendationList);

  let recommendationListUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/recommendationList.json";

  let addListData = function (name, ind) {
    dispatch(authActions.addDataToList({ index: ind }));
  };
  let addRecommendationListData = function (name, ind) {
    dispatch(authActions.addDataToRecommendationList({ index: ind }));
  };

  // let asyncFetchRecommendationList = async function () {
  //   let res = await fetch(recommendationListUrl);
  //   let data = await res.json();
  //   if (data === null) {
  //     let recommendationObj = {
  //       uniqueUserId: {
  //         list: list,
  //         recommendationList: recommendationList,
  //       },
  //     };
  //   } else if (data !== null) {
  //   }
  // };

  let putRecommendationObjHandler = async function (recommendationObj1) {
    try {
      let res = await fetch(recommendationListUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recommendationObj1),
      });

      let data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (logindata !== null) {
      fetch(recommendationListUrl)
        .then((val) => {
          return val.json();
        })
        .then((data) => {
          console.log(" recommendationdata=", data);
          let recommendationObj = {};
          if (data === null) {
            // recommendationObj = {
            //   uniqueUserId: {
            //     list: list,
            //     recommendationList: recommendationList,
            //   },
            // };

            recommendationObj[logindata.userId] = {
              list: list,
              recommendationList: recommendationList,
            };
          } else if (data !== null) {
            recommendationObj = { ...data };
            recommendationObj[logindata.userId] = {
              list: list,
              recommendationList: recommendationList,
            };
          }

          putRecommendationObjHandler(recommendationObj);
        });
    }
  }, [list, recommendationList]);

  if (isLoggedIn === false) {
    return (
      <div className="customize-list-area">
        <div className="customize-list-sec">
          <h1 className="text-center">
            Please Login to set Your recommendation List
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="customize-list-area">
      <div className="customize-list-sec">
        <h1 className="text-center">List</h1>
        {list.length === 0 ? (
          <h5 className="text-center text-muted">
            All Items added to your recommendation List!!
          </h5>
        ) : (
          ""
        )}
        {list.map((val, ind, arr) => {
          return (
            <h4 className="text-center" key={shortid.generate()}>
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
        {recommendationList.length === 0 ? (
          <div className="text-center text-muted">
            <h5>Your Recommendation list is Empty!!</h5>
            <p>Click the above list data to add to your recommendation list </p>
          </div>
        ) : (
          ""
        )}
        {recommendationList.map((val, ind, arr) => {
          return (
            <h4 className="text-center" key={shortid.generate()}>
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
