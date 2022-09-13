import { useState, useEffect } from "react";
import "./signup.css";

const Signup = () => {
  let baseUrl = "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/";
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let postBody = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  let postingData = async function () {
    let res = await fetch(
      `https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      }
    );
    // console.log("res=", res);
    return res;
  };

  let nameChangeHandler = function (e) {
    setName(e.target.value);
  };

  let emailChangeHandler = function (e) {
    setEmail(e.target.value);
  };

  let passwordChangeHandler = function (e) {
    setPassword(e.target.value);
  };

  let confirmPasswordChangeHandler = function (e) {
    setConfirmPassword(e.target.value);
  };

  let submitHandler = function (e) {
    e.preventDefault();
    let postingData = async function () {
      let res = await fetch(
        `https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postBody),
        }
      );
      // console.log("res=", res);
      return res;
    };
    let res = postingData();

    console.log("res=", res);
    alert("registration successful");
  };

  return (
    <div className="signup-area">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={submitHandler}>
          <div class="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="name"
              class="form-control"
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div class="mb-3">
            <label for="password1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
