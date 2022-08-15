import "./UserPanel.css";
import Header from "../Header/Header";
import axios from "axios";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React, { useState, useEffect } from "react";

const UserPanel = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const username = res.data[0].username;
        setName(username);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  let word = name.split("");
  let firstWord = word[0];

  return (
    <div className="panel">
      <Header name={name} />
      <div className="panel-container">
        <div className="name-container">
          <Avatar sx={{ bgcolor: deepPurple[500], width: 36, height: 36 }}>
            {firstWord}
          </Avatar>
          <p className="panel-username">{name}</p>
        </div>
        <div className="brand-info-container">
          <div>
            <p className="brand-info">(+1) 222- 456-78</p>
            <p className="brand-info">info@SandBox.co</p>
            <p className="brand-info">Eaj 1st Block 1st Cross, Bangalore-56</p>
          </div>
          <div className="footer-icon-container">
            <InstagramIcon className="icons" />
            <LinkedInIcon className="icons" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
