import "./Card.css";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Share from "@mui/icons-material/Share";

const ImgCard = ({ title, description, img, alt, totalParticipants, participantName }) => {
  const navigate = useNavigate();
  let participants = {totalParticipants} - 1;
  let name = {participantName};

  return (
    <Card className="card">
      <CardMedia
        className="card-img"
        component="img"
        alt={alt}
        height="100"
        image={img}
      />
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
            <Avatar sx={{ bgcolor: deepPurple[500], width: 28, height: 28 }}>
              {name}
            </Avatar>
            <p className="card-participants-text"> + {participants} </p>
          </div>
          <div className="card-icon-container">
            <Share />
            <Edit />
            <Delete />
          </div>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ImgCard;
