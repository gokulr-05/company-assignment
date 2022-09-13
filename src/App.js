import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./pages/home/Home";
import Recommendation from "./pages/recommendation/Recommendation";
import CustomRecommendation from "./pages/CustomRecommendation/CustomRecommendation";

const App = () => {
  return (
    <div>
      <Header />
      <h1>App</h1>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route
          path="/customrecommendation"
          element={<CustomRecommendation />}
        />
      </Routes>
    </div>
  );
};

export default App;
