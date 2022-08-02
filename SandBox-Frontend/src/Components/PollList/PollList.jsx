import "./PollList.css";
import PassTextFiled from "../PassTextFiled/PassTextFiled";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PollList = () => {
  const navigate = useNavigate();

  return (
    <div className="list">
      <p>Poll list</p>
    </div>
  );
};

export default PollList;
