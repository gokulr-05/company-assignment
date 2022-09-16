import { useEffect, useState } from "react";
import "./header.css";
import user from "../../assets/user.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import {
  MdRecommend,
  MdOutlineRecommend,
  MdDashboardCustomize,
} from "react-icons/md";

import { authActions } from "../../slice/authSlice/authSlice";
import { searchActions } from "../../slice/searchSlice/searchSlice";

const Header = () => {
  let overallShowsDataUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/overallshowsdata.json";
  let recommendationListUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/recommendationList.json";
  let loginInfoUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/loginInfo.json";
  let usersDataUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users.json";
  let [overallShowsData, setOverallShowsData] = useState(null);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let isLoggedIn = useSelector((state) => {
    return state.authReducer.isLoggedIn;
  });

  let [loggedInUserData, setLoggedInUserData] = useState(null);

  let totalDataArr = useSelector((state, action) => {
    return state.authReducer.totalDataArr;
  });

  let logindata = useSelector((state, action) => {
    return state.authReducer.loginData;
  });

  let searchInput = useSelector((state, action) => {
    return state.searchReducer.searchInput;
  });

  let searchResultsArr = useSelector((state, action) => {
    return state.searchReducer.searchResultsArr;
  });

  // console.log("overallShowsData=", overallShowsData);

  let logoutHandler = async function () {
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");

    await fetch(loginInfoUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(null),
    });

    dispatch(authActions.logout());
    alert("Logged out Successfully!!");
    navigate("/home");
  };

  let submitHandler = function (e) {
    e.preventDefault();
    navigate("/searchresults");
  };

  let onChangeHandler = function (e) {
    dispatch(searchActions.updateSearchInput({ searchInput: e.target.value }));
  };

  useEffect(() => {
    fetch(overallShowsDataUrl)
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        let [arr] = Object.values(val);

        setOverallShowsData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (overallShowsData !== null) {
      dispatch(
        authActions.addToTotalDataArr({ dataArr: [...overallShowsData] })
      );
    }
  }, [overallShowsData]);

  // debouncing for search Input box

  useEffect(() => {
    let timer = setTimeout(() => {
      if (totalDataArr.length > 0) {
        if (searchInput?.trim().length > 0) {
          let searchResults = totalDataArr.filter((val, ind, arr) => {
            let title = val.original_name
              ? val.original_name
              : val.original_title
              ? val.original_title
              : val.title
              ? val.title
              : "";

            return title
              ?.trim()
              ?.toLowerCase()
              ?.includes(searchInput?.trim()?.toLowerCase());
          });

          dispatch(
            searchActions.updateSearchResultArr({
              searchResultsArr: searchResults,
            })
          );
        } else if (searchInput?.trim().length === 0) {
          dispatch(searchActions.emptySearchResultsArr());
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
    // console.log("UseEffect in Header js");
    let userId = localStorage.getItem("userId");

    if (userId) {
      let userData = JSON.parse(localStorage.getItem("userData"));

      dispatch(authActions.login());
      dispatch(authActions.setLoginData({ loginData: userData }));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true && logindata !== null) {
      fetch(recommendationListUrl)
        .then((data) => {
          return data.json();
        })
        .then((val) => {
          if (val !== null) {
            if (val[logindata.userId] !== undefined) {
              if (val[logindata.userId].list !== undefined) {
                dispatch(
                  authActions.setList({ list: val[logindata.userId].list })
                );
              }
              if (val[logindata.userId].recommendationList !== undefined) {
                dispatch(
                  authActions.setRecommendationList({
                    recommendationList:
                      val[logindata.userId].recommendationList,
                  })
                );
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [logindata, isLoggedIn]);

  return (
    <div className="header-bar-area">
      <div className="header-bar-sec ">
        <div className="header-row-1 row">
          <div className="col-4">
            <div className="header-icons-container ">
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/home"
              >
                <AiFillHome size="30px" />
              </NavLink>
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/recommend"
              >
                <MdOutlineRecommend size="30px" />
              </NavLink>
              <NavLink
                className={(obj) => {
                  return `${
                    obj.isActive ? "header-nav-active" : "header-nav-inactive"
                  }`;
                }}
                to="/customize"
              >
                <MdDashboardCustomize size="30px" />
              </NavLink>
            </div>
          </div>
          <div className="col-4">
            <form onSubmit={submitHandler}>
              <input
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                type="text"
                className="form-control header-search-bar mt-1"
              />
            </form>
          </div>

          {isLoggedIn === false ? (
            <div className="col-4 header-auth-btn-container-1  ">
              <div className="header-auth-btn-container-2">
                <NavLink
                  to="/signup"
                  className={(obj) => {
                    return `header-signup-btn ${
                      obj.isActive ? "auth-btn-active" : "auth-btn-inactive"
                    }`;
                  }}
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  className={(obj) => {
                    return `header-login-btn ${
                      obj.isActive ? "auth-btn-active" : "auth-btn-inactive"
                    }`;
                  }}
                >
                  Login
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="col-4 header-auth-btn-container-1  ">
              <div className="header-auth-btn-container-2">
                <div className="header-user-img-container">
                  <img src={user} alt="user" className="header-user-img" />
                </div>
                <button
                  onClick={logoutHandler}
                  className="auth-btn-inactive header-logout-btn"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
