import "./ManagePoll.css";
import Header from "../Header/Header";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ManagePoll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      .get(`http://localhost:3001/poll/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
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

  const editPollInfo = () => {
    if (title === "") {
      setError("Title Fields Required And Can't Be Empty!");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:3001/poll/${id}`,
        {
          title: title,
          description: description,
          img_url: imgURL,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res :>> ", res);
        navigate("/list");
      })
      .catch((res) => {
        let status = res.response.status;
        if (status === 401) {
          navigate("/sign-in");
        }
      });
  };

  return (
    <div className="page-container">
      <Header name={name} />
      <div className="manage-poll">
        <div className="manage-poll-container">
          <h1 className="poll-headers">Manage Poll</h1>
          <TextField
            className="text-filed"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <p className="poll-error-text error"></p>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <p className="poll-error-text error"></p>
          <TextField
            className="text-filed"
            id="outlined-basic"
            label="Img URL"
            variant="outlined"
            onChange={(e) => setImgURL(e.target.value)}
            value={imgURL}
          />
          <p className="poll-error-text error">{error}</p>
          <Button
            variant="contained"
            className="manage-poll-btn text"
            onClick={editPollInfo}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagePoll;
