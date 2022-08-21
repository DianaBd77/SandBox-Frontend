import "./PollLink.css";
import Header from "../Header/Header";
import useUsername from "../Header/useUsername";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PollLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name] = useUsername();
  const [copied, setCopied] = useState(false);
  let link = `http://dianabehshad.xyz/poll/${id}`;

  return (
    <div className="poll-link-box">
      <Header name={name} />
      <div className="poll-link-page-container">
        <div className="poll-link-info-container">
          <Typography
            className="share-link-header"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Share Poll Link With Others
          </Typography>
          <Typography
            className="share-link-text"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            You can share your poll with the link below.
          </Typography>
          <div className="share-link-input share-poll-link-box">
            <TextField
              className="share-poll-link-text-field"
              id="outlined-basic"
              variant="outlined"
              value={link}
            />
            <CopyToClipboard text={link} onCopy={() => () => setCopied(true)}>
              <ContentCopy className="copy-share-link" />
            </CopyToClipboard>
          </div>
          <Button
            variant="contained"
            className="manage-poll-btn poll-link-button"
            onClick={() => {
              navigate(`/poll/${id}`);
            }}
          >
            Go to Poll Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PollLink;
