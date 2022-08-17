import "./Card.css";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import AvatarPro from "../Avatar/Avatar";
import ShareModal from "../ShareModal/ShareModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import Poll from "@mui/icons-material/Poll";


const ImgCard = ({
  title,
  description,
  img,
  alt,
  participants,
  name,
  link,
  id,
}) => {
  const navigate = useNavigate();
  let totalParticipants = parseInt(`${participants}`) - 1;
  let word = name && name.split("");
  let username = name && word[0].toUpperCase() + word.slice(1).join("");
  let pollLink = `${link}`;

  const [zero, setZero] = useState(false);
  // if (`${participants}` === "0"){
  //   setZero(true);
  // }

  return (
    <Card className="card">
      <div className="card-pic-container">
      <CardMedia
        className="card-img"
        component="img"
        // alt={alt}
        width = "110"
        height="110"
        image={img}
      />
      </div>
      <CardContent className="card-content">
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "8px" }}
        >
          {description}
        </Typography>
        <div className="card-header-container">
          <div className="participant-container">
            <AvatarPro username={username} />
            <p className="card-participants-text"> + {totalParticipants} </p>
          </div>
          <div className="card-icon-container">
            <ShareModal className="card-icons" link={pollLink} />
            <Edit
              className="card-icons"
              onClick={() => {
                navigate(`/manage-poll/${pollLink}`);
              }}
            />
            <DeleteModal
            className="card-icons" 
            link={pollLink}
            id = {id} />
          </div>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ImgCard;
