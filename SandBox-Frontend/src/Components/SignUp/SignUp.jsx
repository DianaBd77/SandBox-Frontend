import "./SignUp.css";
import PassTextFiled from "../PassTextFiled/PassTextFiled";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="sign-up">
      <p>Sign Up here!</p>
    </div>
  );
};

export default SignUp;
