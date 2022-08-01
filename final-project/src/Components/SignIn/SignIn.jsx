import "./SignIn.css";
import React, {useState} from "react";
import { TextField, Button } from "@mui/material";


const SignIn = () => {
    const [usernameError, setUsernameError] = useState("");
    const [passError, setPassError] = useState("");

    const login = () =>{

    }

    return (
        <div className="sign-in">
            <div className="sign-in-container">
                <h1 className="header">Sing In</h1>
                <TextField  className="text-filed" id="outlined-basic" label="Username" variant="outlined" />
                <p className="sign-in-text error">{usernameError}</p>
                <TextField  className="text-filed" id="outlined-basic" label="Password" variant="outlined" />
                <p className="sign-in-text error">{passError}</p>
                <p className="sign-in-text account-text">Don't have an account? &nbsp;<span className="create-account">Create Account</span></p>
                <Button variant="contained" className="sign-in-btn text">Sign In</Button>
            </div>
        </div>
    );
};

export default SignIn;