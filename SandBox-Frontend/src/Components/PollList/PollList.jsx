import "./PollList.css";
import Header from "../Header/Header";
import Card from "../Card/Card";
import usePollData from "./usePollData";
import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PollList = () => {
  const navigate = useNavigate();
  const [pollData] = usePollData();
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
