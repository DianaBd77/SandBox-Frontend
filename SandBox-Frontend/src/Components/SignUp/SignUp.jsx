import "./SignUp.css";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
  const [namesError, setNamesError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passError, setPassError] = useState("");

  const emailValidation = (validEmail) => {
    let validation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test(
        validEmail
      );
    return validation;
  };

  const createAccount = () => {
    const emailValidate = emailValidation(email);
    if ((emailValidate === false) & (email !== "")) {
      setEmailError("Invalid Email Address");
      return;
    } else {
      setEmailError("");
    }

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      pass === ""
    ) {
      setPassError("All the Above Fields Required And Can't Be Empty!");
      return;
    }

    if (password !== pass) {
      setPassError("Passwords Do not Match");
      return;
    }

    if (password.length < 8) {
      setPassError("Password Must Have at Least 8 Character");
      return;
    }

    axios
      .post(`http://localhost:3001/account/signup`, {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setEmailError("");
        setPassError("");
        navigate("/list");
      })
      .catch((res) => {
        let error = res.response.data;
        let status = res.response.status;
        setUsernameError("");
        setEmailError("");
        setPassError("");
        if ((status === 409) & (error === "Username Already Exist!")) {
          setUsernameError(error);
        } else if ((status === 409) & (error === "Email Already Exist!")) {
          setEmailError(error);
        } else {
          setPassError("Failed to Load Response Data");
        }
      });
  };

  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <h1 className="header">Sing Up</h1>
        <div className="sign-up-username">
          <div className="sign-up-name-container">
            <TextField
              className="text-filed names"
              id="outlined-basic-firstName"
              label="First Name"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="sign-up-name-container">
            <TextField
              className="text-filed names"
              id="outlined-basic-lastName"
              label="Last Name"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
        </div>
        <p className="sign-up-text error">{namesError}</p>
        <TextField
          className="text-filed"
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="sign-up-text error">{emailError}</p>
        <TextField
          className="text-filed"
          id="outlined-basic-username"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <p className="sign-up-text error">{usernameError}</p>
        <div className="user-pass">
          <div className="pass-container">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="pass-container">
            <TextField
              id="outlined-pass-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </div>
        </div>
        <p className="sign-up-text error">{passError}</p>
        <p className="sign-up-text account-text">
          Already have an account? &nbsp;
          <span className="have-account" onClick={() => navigate("/sign-in")}>
            Login
          </span>
        </p>
        <Button
          variant="contained"
          className="sign-up-btn text"
          onClick={createAccount}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
