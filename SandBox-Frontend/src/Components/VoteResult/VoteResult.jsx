import "./VoteResult.css";
import React, { useState } from "react";
import { Done, Close } from "@mui/icons-material";

const VoteResult = ({participant, item}) => {
  const [participantName, setParticipantName] = useState("");

  return (
    <div className="vote-result-card">
      <div className="poll-vote-final-result-box">
        <div className="poll-participant-name-container">
          <div className="vote-participant-name-container">
            <div className="poll-item-title-box vote-participant-name-box">
              <p>{participant}</p>
            </div>
          </div>
          <div className="poll-participant-name-box"></div>
        </div>
        <div className="poll-result-container">
          <div className="poll-item-title-container">
            <div className="poll-item-title-box participant-vote-result">
              <div className="poll-item-title-text">
                <Done
                  sx={{ width: "40px", height: "40px", color: "#381e72" }}
                />
              </div>
            </div>
            <div
              className="poll-item-title-box participant-vote-result"
              style={{ backgroundColor: "#F6EDFF" }}
            >
              <div className="poll-item-title-text">
                <Close
                  sx={{
                    width: "40px",
                    height: "40px",
                    color: "black",
                    opacity: "5%",
                  }}
                />
              </div>
            </div>
            <div
              className="poll-item-title-box participant-vote-result"
              style={{ backgroundColor: "#F6EDFF" }}
            >
              <div className="poll-item-title-text">
                <Close
                  sx={{
                    width: "40px",
                    height: "40px",
                    color: "black",
                    opacity: "5%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteResult;
