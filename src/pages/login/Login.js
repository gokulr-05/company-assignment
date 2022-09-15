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
    let res = await fetch(userDataUrl);
    let data = await res.json();

    if (data === null) {
      alert(
        "Email is not Registered!!\nPlease Register the email and try to login"
      );
      resetFields();
    } else if (data != null) {
      let overallFlag = false;
      let emailFlag = false;
      let passwordFlag = false;
      for (let key in data) {
        let val = data[key];
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

      if (overallFlag === true && emailFlag === true && passwordFlag === true) {
        try {
          localStorage.setItem("userId", loginData.userId);
          localStorage.setItem("userData", JSON.stringify(loginData));
          // let res = await fetch(loginInfoUrl, {
          //   method: "PUT",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(loginData),
          // });
        } catch (err) {
          console.log(err);
        }
        dispatch(authActions.login());
        dispatch(authActions.setLoginData({ loginData: loginData }));

        alert("LoggedIn Successfully!!");
        resetFields();
        navigate("/home");
      } else if (
        emailFlag === true &&
        passwordFlag === false &&
        overallFlag === false
      ) {
        alert("Incorrect Password!!\nPlease Provide a valid password");
        setPassword("");
      } else if (
        emailFlag === false &&
        passwordFlag === false &&
        overallFlag === false
      ) {
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
      alert("Email And Password Fields should not be empty!!");
      return;
    }

    fetchDataHandler();
  };

  useEffect(() => {}, [isLoggedIn]);

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
