import "./CreatePoll.css";
import Header from "../Header/Header";
import useUsername from "../Header/useUsername";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [name] = useUsername();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [error, setError] = useState("");

  const createNewPoll = async () => {
    if (
      title === "" ||
      firstOption === "" ||
      secondOption === "" ||
      thirdOption === ""
    ) {
      setError(" Title And Options Fields Can't Be Empty!");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://dianabehshad.xyz/api/poll`,
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
        const id = res.data[0].insertId;
        createPollItems(id);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
        console.log("err :>> ", status, error);
        if (status === 401) {
          navigate("/sign-in");
        }
      });
  };

  const createPollItems = async (id) => {
    const token = localStorage.getItem("token");
    const pollID = id;
    axios
      .post(
        `http://dianabehshad.xyz/api/item`,
        [
          {
            poll_id: pollID,
            item: firstOption,
          },
          {
            poll_id: pollID,
            item: secondOption,
          },
          {
            poll_id: pollID,
            item: thirdOption,
          },
        ],
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getNewPollLink(pollID);
      })
      .catch((err) => {
        let error = err.response.data;
        let status = err.response.status;
        console.log("err :>> ", status, error);
        if (status === 401) {
          navigate("/sign-in");
        }
      });
  };

  const getNewPollLink = async (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://dianabehshad.xyz/api/poll/pollID/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        let link = await res.data[0].link;
        navigate(`/poll-link/${link}`);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  return (
    <div className="page-container">
      <Header name={name} />
      <div className="create-poll">
        <div className="create-poll-container">
          <h1 className="poll-headers">Create Poll</h1>
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
          <p className="poll-error-text error"></p>
          <div className="option-container">
            <div className="options">
              <TextField
                className="text-filed"
                id="outlined-basic"
                label="First Option"
                variant="outlined"
                onChange={(e) => setFirstOption(e.target.value)}
                value={firstOption}
              />
            </div>
            <div className="options">
              <TextField
                className="text-filed"
                id="outlined-basic"
                label="Second Option"
                variant="outlined"
                onChange={(e) => setSecondOption(e.target.value)}
                value={secondOption}
              />
            </div>
            <div className="options">
              <TextField
                className="text-filed"
                id="outlined-basic"
                label="Third Option"
                variant="outlined"
                onChange={(e) => setThirdOption(e.target.value)}
                value={thirdOption}
              />
            </div>
          </div>
          <p className="poll-error-text error">{error}</p>
          <Button
            variant="contained"
            className="create-poll-btn text"
            onClick={createNewPoll}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
