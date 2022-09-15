import { useState, useEffect } from "react";
import "./login.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../slice/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../../validation/validation";

let loginData = null;
const Login = () => {
  let isLoggedIn = useSelector((state, action) => {
    return state.authReducer.isLoggedIn;
  });

  let logInfo = useSelector((state, action) => {
    return state.authReducer.loginData;
  });
  // console.log("isLoggedIn=", isLoggedIn);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userDataUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users.json";
  let loginInfoUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/loginInfo.json";
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [disable, setDisable] = useState(true);

  let validationCheck = function () {
    if (validEmail.test(email) && validPassword.test(password)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  let resetFields = function () {
    setEmail("");
    setPassword("");
  };

  let fetchDataHandler = async function () {
    console.log("Inside FetchDataHandler");
    let res = await fetch(userDataUrl);
    let data = await res.json();

    console.log("fetched data=", data);

    if (data === null) {
      console.log(
        "Email is not Registered!!\nPlease Register the email and try to login"
      );
      alert(
        "Email is not Registered!!\nPlease Register the email and try to login"
      );
      resetFields();
    } else if (data != null) {
      console.log("Inside else condition of not null");
      let overallFlag = false;
      let emailFlag = false;
      let passwordFlag = false;
      for (let key in data) {
        console.log("key=", key);
        let val = data[key];
        console.log("val=", val);
        overallFlag = false;
        emailFlag = false;
        passwordFlag = false;

        if (email === val.email) {
          emailFlag = true;
          if (password === val.password) {
            passwordFlag = true;
            overallFlag = true;
            loginData = { ...val };
            break;
          } else {
            passwordFlag = false;
            overallFlag = false;
            break;
          }
        }
      }
      console.log("After For loop");

      if (overallFlag === true && emailFlag === true && passwordFlag === true) {
        try {
          let res = await fetch(loginInfoUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          });
          console.log("res=", res);
        } catch (err) {
          console.log(err);
        }
        dispatch(authActions.login());
        dispatch(authActions.setLoginData({ loginData: loginData }));

        console.log("LoggedIn Successfully!!");
        alert("LoggedIn Successfully!!");
        resetFields();
        navigate("/home");
      } else if (
        emailFlag === true &&
        passwordFlag === false &&
        overallFlag === false
      ) {
        console.log("Incorrect Password!!\nPlease Provide a valid password");
        alert("Incorrect Password!!\nPlease Provide a valid password");
        setPassword("");
      } else if (
        emailFlag === false &&
        passwordFlag === false &&
        overallFlag === false
      ) {
        console.log(
          "Email is not Registered!!\nPlease Register the email and try to login"
        );
        alert(
          "Email is not Registered!!\nPlease Register the email and try to login"
        );
        resetFields();
      }
    }
  };

  let emailChangeHandler = function (e) {
    setEmail(e.target.value);
  };

  let passwordChangeHandler = function (e) {
    setPassword(e.target.value);
  };

  let formSubmitHandler = function (e) {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      console.log("Email And Password Fields should not be empty!!");
      alert("Email And Password Fields should not be empty!!");
      return;
    }

    fetchDataHandler();
  };

  useEffect(() => {
    console.log("isLoggedIn=", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("logInfo=", logInfo);
  }, [logInfo]);

  useEffect(() => {
    validationCheck();
  }, [email, password]);

  return (
    <div className="login-area">
      <div className="login-form-container">
        <form className="login-form" onSubmit={formSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email address
            </label>
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={emailChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={password}
              type="password"
              className="form-control"
              onChange={passwordChangeHandler}
            />
            <small className="text-muted">
              Min 8 characters. Must contain uppercase,lowercase,symbol.
            </small>
          </div>

          <button disabled={disable} type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
