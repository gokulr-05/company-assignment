import { useEffect, useState } from "react";
import shortid from "shortid";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "../../validation/validation";

const Signup = () => {
  let navigate = useNavigate();
  let [isError, setIsError] = useState(false);
  let baseUrl = "https://company-assignment-9d5e6-default-rtdb.firebaseio.com";
  let usersDataUrl =
    "https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users.json";
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [disable, setDisable] = useState(true);

  let validationCheck = function () {
    if (
      validEmail.test(email) &&
      validPassword.test(password) &&
      confirmPassword === password
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  let postingData = async function (uniqueUserId) {
    let res = await fetch(
      `https://company-assignment-9d5e6-default-rtdb.firebaseio.com/users.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          userId: uniqueUserId,
        }),
      }
    );

    return res;
  };

  let fetchIdHandler = async function (newId) {
    let res = await fetch(usersDataUrl);
    let data = await res.json();
    if (data !== null) {
      let usersDataArr = Object.values(data);

      if (usersDataArr.length > 0) {
        let idArr = usersDataArr.map((val, index, arr) => {
          return val.userId;
        });
        return idArr.includes(newId) ? true : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
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

  let fetchHandler = function () {
    let asyncFetchHandler = async function () {
      let res = await fetch(`${baseUrl}/users.json`);
      let data = await res.json();

      return data;
    };
    try {
      return asyncFetchHandler();
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  let uniqueUserIdGenerator = async function () {
    let newId;
    let idBool = true;

    while (idBool) {
      newId = shortid.generate();
      try {
        idBool = await fetchIdHandler(newId);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    }

    try {
      await postingData(newId);
    } catch (err) {
      console.log(err);
      setIsError(true);
    }

    alert("registration successful");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  };

  let submitHandler = function (e) {
    e.preventDefault();

    async function asyncOperation() {
      try {
        let data = await fetchHandler();

        if (data !== null) {
          let existingUsersArr = Object.values(data);
          if (existingUsersArr.length > 0) {
            let usersEmailArr = existingUsersArr.map((val, ind, arr) => {
              return val.email;
            });
            if (!usersEmailArr.includes(email)) {
              uniqueUserIdGenerator();
            } else {
              alert(
                "EmailAddress already registered!!\nPlease proceed with Login or use alternate email to signup"
              );
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }
          } else {
            uniqueUserIdGenerator();
          }
        } else {
          uniqueUserIdGenerator();
        }
      } catch (err) {
        console.log("err=", err);
        setIsError(true);
      }
    }
    try {
      asyncOperation();
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    validationCheck();
  }, [email, password, confirmPassword]);

  if (isError === true) {
    return <h1 className="my-5">Something went wrong</h1>;
  }

  return (
    <div className="signup-area">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={passwordChangeHandler}
            />
            <small className="text-muted">
              Min 8 characters. Must contain uppercase,lowercase,symbol.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
            />
            <small className="text-muted">Should be same as password.</small>
          </div>

          <button disabled={disable} type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
