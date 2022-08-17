import "./PollList.css";
import Header from "../Header/Header";
import Card from "../Card/Card";
import usePollData from "./usePollData";
import useUsername from "../Header/useUsername";
import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PollList = () => {
  const navigate = useNavigate();
  const [pollData, error, fetchData] = usePollData();
  const [name] = useUsername();

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
