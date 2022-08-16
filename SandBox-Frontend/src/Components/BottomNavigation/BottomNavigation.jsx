import "./BottomNavigation.css";
import React, { useState } from "react";
import { BottomNavigationAction, BottomNavigation, Box } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Category from "@mui/icons-material/Category";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navigation = ({ home }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Poll"
          icon={<Category />}
          onClick={() => {
            navigate("/list");
          }}
        />
        <BottomNavigationAction
          label="Panel"
          icon={<AccountCircle />}
          onClick={() => {
            navigate("/panel");
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navigation;
