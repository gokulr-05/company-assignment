import { useEffect } from "react";
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

const Header = () => {
  let loginInfoUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/loginInfo.json";
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let isLoggedIn = useSelector((state) => {
    return state.authReducer.isLoggedIn;
  });

  let logoutHandler = async function () {
    await fetch(loginInfoUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(null),
    });

    dispatch(authActions.logout());
    alert("Logged out Successfully!!");
    navigate("/home");
  };

  useEffect(() => {
    fetch(loginInfoUrl)
      .then((data) => {
        return data.json();
      })
      .then((val) => {
        console.log("fetched login info=", val);
        if (val !== null) {
          dispatch(authActions.login());
          dispatch(authActions.setLoginData({ loginData: val }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <input
              placeholder="Search..."
              type="text"
              className="form-control header-search-bar mt-1"
            />
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
