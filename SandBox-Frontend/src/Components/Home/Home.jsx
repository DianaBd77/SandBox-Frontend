import "../../App.css";
import "./Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const loggedIn = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/account/logged-in`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
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
    <div className="home">
      <div className="home-pic">
        <img
          className="home-img"
          alt="scheduling"
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ></img>
      </div>
      <div className="home-container">
        <h1 className="logo text">SandBox</h1>
        <p className="intro text">
          Free Online Poll to Make Professional Scheduling Easy
        </p>
        <p className="feature text">Easy Scheduling</p>
        <p className="feature text">Unlimited polls and participants</p>
        <Button variant="contained" className="button text" onClick={loggedIn}>
          Create New Poll
        </Button>
      </div>
    </div>
  );
};

export default Home;
