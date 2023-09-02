import React from "react";
import Home from "./Home";
import Game from "./Game";
import About from "./About";
import { Routes, Route } from "react-router-dom";
import { withRouter } from "../utils/WithRouter";

const Router: React.FC = () => {

  return (
    <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/game" element={<Game/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
  );
};

export default withRouter(Router);