import "./DeleteModal.css";
import axios from "axios";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({ link, id }) {
  const navigate = useNavigate();

  let pollLink = `${link}`;
  let pollID = id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deletePoll = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/poll/${pollLink}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        deletePollData(pollID);
        handleClose();
      })
      .catch((err) => {
        let status = err.response.status;
        if (status === 401) {
          navigate("/sign-in");
        }
      });
  };

  const deletePollData = async (id) => {
    const token = localStorage.getItem("token");

    const deleteItems = axios.delete(`http://localhost:3001/item/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const deleteParticipants = axios.delete(
      `http://localhost:3001/participant/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const deleteChoices = axios.delete(`http://localhost:3001/choice/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    await axios
      .all([deleteItems, deleteParticipants, deleteChoices])
      .then(
        axios.spread(function (resItem, resParticipant, resChoice) {
          renderData();
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const renderData = async() => {
      const token = localStorage.getItem("token");
      await axios
        .get(`http://localhost:3001/poll`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div>
      <Delete className="card-icons" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"modal-box"}>
          <Close className="close-delete-link" onClick={handleClose} />
          <Typography
            className="delete-link-header"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Poll
          </Typography>
          <Typography
            className="delete-link-text"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Are you sure you want to delete this poll?
          </Typography>
          <div className="delete-link-button">
            <Button
              variant="outlined"
              className="cancel-poll-btn delete-button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="delete-poll-btn delete-button"
              onClick={deletePoll}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
