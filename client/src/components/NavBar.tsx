import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.sass"
import { useState, useEffect } from "react";

const NavBar = () => {

  const [user, setUser] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("user") !== user) {
      setUser(window.sessionStorage.getItem("user"));
    }
  }, [user]);

  return (
    <AppBar
      className="nav-bar"
      position="sticky">
      <Toolbar className="tool-bar">
        <NavLink className="app-name nav-link" to="/home">
          <span className="full-text">
            Guess That Song 🎧
          </span>
        </NavLink>
        <NavLink className={(isActive) =>
            "nav-link" + (!isActive.isActive ? "" : "-active")} 
            to="/home">
          Home
        </NavLink>
        {user && 
        <NavLink className={(isActive) =>
            "nav-link" + (!isActive.isActive ? "" : "-active")}
           to="/game">
        Game
      </NavLink>}
      <NavLink className={(isActive) =>
            "nav-link" + (!isActive.isActive ? "" : "-active")}
             to="/about">
        About
      </NavLink>
    </Toolbar>
    </AppBar >
  );
};

export default NavBar;