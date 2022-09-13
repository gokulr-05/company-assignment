import { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header/Header";
import Recommend from "./pages/recommend/Recommend";
import Customize from "./pages/customize/Customize";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
const App = () => {
  let fetchFunc = async () => {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/550?api_key=f93445a942bd04c00b774a5d9c724293"
    );
    let data = await response.json();
    // console.log("data=", data);
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  return (
    <div className="app-area ">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
