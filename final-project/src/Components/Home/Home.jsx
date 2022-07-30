import "../../App.css";
import "./Home.css";
import React from "react";
import { Button } from "@mui/material";


const Home = () => {
    return (
        <div className="home">
            <div className="home-container">
                <h1 className="logo">SandBox</h1>
                <p className="intro">Free Online Poll to Make Professional Scheduling Easy</p>
                <p className="feature">Easy Scheduling</p>
                <p className="feature">Unlimited polls and participants</p>
                <Button variant="contained" className="button">Create New Poll</Button>
            </div>
        </div>
    );
};

export default Home;
