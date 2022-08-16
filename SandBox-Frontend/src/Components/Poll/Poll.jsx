import "./Poll.css";
import Header from "../Header/Header";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Poll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [error, setError] = useState("");
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

    axios
      .get(
        `http://localhost:3001/poll/${"3dcf538f-7a9f-4e95-933d-879451be5e31"}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let title = res.data[0].title;
        setTitle(title);
        let description = res.data[0].description;
        setDescription(description);
        let imgURL = res.data[0].img_url;
        setImgURL(imgURL);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);



  return (
    <div className="page-container">
      <Header name={name} />
      <div className="poll-page">
        <div className="poll-page-container">
            <div className="poll-img-container">
            <img className="poll-page-img" src={imgURL}></img>
            </div>
            <div className="poll-text-container">
            <h1 className="poll-header-text">{title}</h1>
            <p className="poll-description-text">{description}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
