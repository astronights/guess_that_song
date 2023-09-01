import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
// import "../assets/css/Component.scss";

const NavBar = () => {
  return (
    <AppBar
      className="nav-bar"
      position="sticky"
    >
      <Toolbar>
        <NavLink className="app-name nav-link" to="/home">
          <span className="full-text">
            Guess That Song
          </span>
          <span className="short-text">Guess That Song</span>
        </NavLink>
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/game">
          Game
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;