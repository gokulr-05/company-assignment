import { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header/Header";
import Recommend from "./pages/recommend/Recommend";
import Customize from "./pages/customize/Customize";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import SearchResults from "../src/pages/searchResults/SearchResults";
const App = () => {
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
        <Route path="/searchresults" element={<SearchResults />} />
      </Routes>
    </div>
  );
};

export default App;
