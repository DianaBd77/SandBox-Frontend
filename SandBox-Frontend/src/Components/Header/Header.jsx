import "./Header.css";
import React from "react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Header = () => {
  return (
    <div className="header-component">
      <div className="header-container">
        <h1 className="logo header-logo">SandBox</h1>
        <div className="app-bar">
          <p className="app-bar-text">Home</p>
          <p className="app-bar-text">Poll List</p>
          <p className="app-bar-text">Create +</p>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}>
            D
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
