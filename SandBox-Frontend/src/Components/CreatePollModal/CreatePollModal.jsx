import "./CreatePollModal.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ShareModal({ link }) {
    console.log('pollLink :>> ', link);
  const navigate = useNavigate();
  let pollLink = `localhost:3000/poll/${link}`;
  const [open, setOpen] = React.useState(false);
  if (link) {
    setOpen(true);
  }
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Share className="card-icons" onClick={handleOpen} /> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"modal-box"}>
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
          <div className="share-link-input">
            <TextField
              className="share-link-text-filed"
              id="outlined-basic"
              variant="outlined"
              value={pollLink}
            />
            <ContentCopy
              className="copy-share-link"
              onClick={() => {
                navigator.clipboard.writeText(pollLink);
              }}
            />
          </div>
          <Button
            variant="contained"
            className="create-poll-btn text"
            onClick={() => {
              navigate("/list");
            }}
          >
            Go To Poll List
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
