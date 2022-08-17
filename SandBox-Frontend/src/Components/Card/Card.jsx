import "./Card.css";
import React, { useState, useEffect } from "react";
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

const ImgCard = ({
  title,
  description,
  img,
  alt,
  participants,
  name,
  link,
  id,
  fetchData,
}) => {
  const navigate = useNavigate();
  const [participantExist, setParticipantExist] = useState(false);
  const [pollParticipants, setPollParticipants] = useState(0);
  const [zero, setZero] = useState(false);

  let word = name && name.split("");
  let username = name && word[0].toUpperCase() + word.slice(1).join("");
  let pollLink = `${link}`;
  let totalParticipants = parseInt(`${participants}`);

  useEffect(() => {
    if (totalParticipants > 0) {
      setParticipantExist(true);
    }

    let eachPollParticipants = totalParticipants - 1;
    setPollParticipants(eachPollParticipants);

    if (eachPollParticipants === 0) {
      setZero(true);
    }
  }, [totalParticipants]);

  return (
    <Card className="card">
      <div className="card-pic-container">
        <CardMedia
          className="card-img"
          component="img"
          // alt={alt}
          width="110"
          height="110"
          image={img}
        />
      </div>
      <CardContent
        className="card-content"
        onClick={() => navigate(`/poll/${pollLink}`)}
      >
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
          <div
            className="participant-container"
            style={{ display: participantExist ? "flex" : "none" }}
          >
            <AvatarPro username={username} />
            <p
              className="card-participants-text"
              style={{ display: zero ? "none" : "inline" }}
            >
              {" "}
              + {pollParticipants}{" "}
            </p>
          </div>
        </div>
      </CardContent>
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
          id={id}
          fetchData={fetchData}
        />
      </div>
      <CardActions></CardActions>
    </Card>
  );
};

export default ImgCard;
