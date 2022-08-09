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

const ImgCard = ({ title, description, img, alt }) => {
  const navigate = useNavigate();

  return (
    <Card className="card" onClick={() => navigate(`/${alt}`)}>
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
        <div className="participant-container">
          <Avatar sx={{ bgcolor: deepPurple[500], width: 28, height: 28 }}>
            D
          </Avatar>
          <p className="card-participants-text"> + 3</p>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ImgCard;
