import "./CreatePoll.css";
import Header from "../Header/Header";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [insertedID, setInsertedID] = useState("");


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
        `http://localhost:3001/poll`,
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
        // setInsertedID(id);
        // createPollItems(insertedID);
        createPollItems(id);
      })
      .catch((res) => {
        let error = res.response.data;
        let status = res.response.status;
        console.log("err :>> ", status, error);
        if(status === 401){
          navigate("/sign-in");
        }
      });
  };

  const createPollItems = async (id) => {
    const token = localStorage.getItem("token");
    const pollID = id;
    console.log('pollID :>> ', pollID);
    axios
      .post(
        `http://localhost:3001/item`,
        [
          {
            poll_id: pollID,
            item: firstOption,
          },
          {
            poll_id: insertedID,
            item: secondOption,
          },
          {
            poll_id: insertedID,
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
        console.log("res :>> ", res);
      })
      .catch((res) => {
        let error = res.response.data;
        let status = res.response.status;
        console.log("err :>> ", status, error);
        if(status === 401){
          navigate("/sign-in");
        }
      });
  };


  // const pollCreator = async () => {
  //   let pollID = await createNewPoll();
  //   console.log('poll_id :>> ', pollID);
  //   await createPollItems(pollID);
  // }

  return (
    <div className="create-poll">
      <Header
      name = {name}
      />
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
  );
};

export default CreatePoll;
