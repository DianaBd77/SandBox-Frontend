import "./PollList.css";
import Header from "../Header/Header";
import Card from "../Card/Card";
import React, { useState, useEffect } from "react";
import useUsername from "../Header/useUsername";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PollList = () => {
  const navigate = useNavigate();
  // const [pollData, fetchData] = usePollData();
  const [pollData, setPollData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [name] = useUsername();

  const fetchData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/poll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setPollData(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let poll = pollData.map((data) => {
    return (
      <Card
        key={data.id}
        title={data.title}
        description={data.description}
        img={data.img_url}
        alt={data.title}
        participants={data.participants}
        name={data.name}
        link={data.link}
        id={data.id}
        fetchData={fetchData}
      />
    );
  });

  return (
    <div className="list">
      <Header name={name} />
      <div className="list-card-container">{poll}</div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate("/create-poll");
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default PollList;
