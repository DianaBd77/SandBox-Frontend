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

  return (
    <div className="list">
      <Header />
      <div className="list-container">
        <Card
          title={"Hangout"}
          description={"Do you wanna hangout tonight?"}
          img={
            "https://images.unsplash.com/photo-1532635236-d50c8592eb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=811&q=80"
          }
          alt={"hangout"}
        />
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default PollList;
