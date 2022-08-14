import "./ManagePoll.css";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");

  const editPollInfo = () => {
    console.log('edit :>> ');
    // if (username === "" || password === "") {
    //   setPassError(" All the Above Fields Required And Can't Be Empty!");
    //   return;
    // }
    // axios
    //   .post(`http://localhost:3001/account/login`, {
    //     username: username,
    //     password: password,
    //   })
    //   .then((response) => {
    //     const token = response.data.token;
    //     localStorage.setItem("token", token);
    //     setUsernameError("");
    //     setPassError("");
    //     navigate("/list");
    //   })
    //   .catch((res) => {
    //     let error = res.response.data;
    //     let status = res.response.status;

    //     if (status === 404) {
    //       setUsernameError(error);
    //       setPassError("");
    //     } else if (status === 403) {
    //       setPassError(error);
    //       setUsernameError("");
    //     }
    //   });
  };

  return (
    <div className="manage-poll">
      <div className="manage-poll-container">
        <h1 className="header">Manage Poll</h1>
        <TextField
          className="text-filed"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="manage-poll-text error"></p>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <p className="manage-poll-text error"></p>
        <TextField
          className="text-filed"
          id="outlined-basic"
          label="Img URL"
          variant="outlined"
          onChange={(e) => setImgURL(e.target.value)}
          value={imgURL}
        />
        <p className="manage-poll-text error"></p>
        <Button
          variant="contained"
          className="manage-poll-btn text"
          onClick={editPollInfo}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ManagePoll;
