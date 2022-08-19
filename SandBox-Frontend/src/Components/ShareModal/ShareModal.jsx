import "./ShareModal.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Share } from "@mui/icons-material";
import { ContentCopy } from "@mui/icons-material";
import { Close } from "@mui/icons-material";

export default function ShareModal({ link }) {
  let pollLink = `localhost:3000/poll/${link}`;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Share className="card-icons" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"modal-box"}>
          <Close className="close-share-link" onClick={handleClose} />
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
        </Box>
      </Modal>
    </div>
  );
}
