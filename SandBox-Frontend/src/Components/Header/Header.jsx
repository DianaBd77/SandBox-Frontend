import "./Header.css";
import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Header = ({ name }) => {
  let word = name.split("");
  let firstWord = word[0];

  return (
    <div className="header-component">
      <div className="header-container">
        <h1 className="logo header-logo">SandBox</h1>
        <div className="app-bar">
          <p className="app-bar-text">Home</p>
          <p className="app-bar-text">Poll List</p>
          <p className="app-bar-text">Create +</p>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}>
            {firstWord}
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
