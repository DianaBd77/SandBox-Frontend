import "./PollList.css";
import Header from "../Header/Header";
import Card from "../Card/Card";
import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PollList = () => {
  const navigate = useNavigate();
  const [pollData, setPollData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [link, setLink] = useState("");
  const [participants, setParticipants] = useState("");
  const [participantName, setParticipantName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/poll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let pollInfo = response.data;
        setPollData(pollInfo);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  }, []);

  let poll = pollData.map((data, index) => {
    setTitle(data.title);
    setDescription(data.description);
    setImgURL(data.img_url);
    setLink(data.link);
    setParticipants(data.participants);
    setParticipantName(data.name);

    return (
      <Card
        key={index}
        title={title}
        description={description}
        img={imgURL}
        alt={title}
        totalParticipants={participants}
        participantName={participantName}
        link={link}
      />
    );
  });

  return (
    <div className="list">
      <Header />
      {poll}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default PollList;
