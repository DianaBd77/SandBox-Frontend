import "../../App.css";
import "./Footer.css";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <p className="info">
          Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
          &nbsp;<span>| &nbsp;</span>
        </p>
        <p className="info">
          info@SandBox.co &nbsp;<span>| &nbsp;</span>
        </p>
        <p className="info">(+1) 222- 456-78</p>
      </div>
      <div className="footer-icon-container">
        <InstagramIcon className="icons" />
        <LinkedInIcon className="icons" />
      </div>
    </div>
  );
};

export default Footer;
