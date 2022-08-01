import "./SignIn.css";
import PassTextFiled from "../PassTextFiled/PassTextFiled";
import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passError, setPassError] = useState("");

    const login = () => {

            axios.post(`http://localhost:3001/account/login`,{
                username: username,
                password: password
            }).then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setPassError("");
                navigate("/list");
            }).catch((res) => {
                let error = res.response.data;
                let status = res.response.status;
                
                if(status === 404){
                    setUsernameError(error);
                }else if (status === 403){
                    setPassError(error);
                    setUsernameError("")
                }
            })
    }

    return (
        <div className="sign-in">
            <div className="sign-in-container">
                <h1 className="header">Sing In</h1>
                <TextField
                    className="text-filed"
                    id="outlined-basic" label="Username" 
                    variant="outlined" 
                    onChange={(e) => setUsername(e.target.value)} />
                <p className="sign-in-text error">{usernameError}</p>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="sign-in-text error">{passError}</p>
                <p className="sign-in-text account-text">Don't have an account? &nbsp;
                <span className="create-account" onClick={() => navigate("/sign-up")}>Create Account</span>
                </p>
                <Button variant="contained" className="sign-in-btn text" onClick={login}>Sign In</Button>
            </div>
        </div>
    );
};

export default SignIn;