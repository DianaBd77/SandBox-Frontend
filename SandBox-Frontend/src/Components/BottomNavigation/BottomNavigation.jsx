import "./BottomNavigation.css";
import React, { useState } from "react";
import { BottomNavigationAction, BottomNavigation, Box } from "@mui/material";
import Home from "@mui/icons-material/Home";
import Category from "@mui/icons-material/Category";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Poll" icon={<Category />} />
        <BottomNavigationAction label="Panel" icon={<AccountCircle />} />
      </BottomNavigation>
    </Box>
  );
};

export default Navigation;
