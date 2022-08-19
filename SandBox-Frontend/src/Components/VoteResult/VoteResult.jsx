import "./VoteResult.css";
import React, { useState, useEffect } from "react";
import { Done, Close } from "@mui/icons-material";

const VoteResult = ({ participant, id, firstID, secondID, thirdID }) => {
  const [firstChoice, setFirstChoice] = useState(false);
  const [secondChoice, setSecondChoice] = useState(false);
  const [thirdChoice, setThirdChoice] = useState(false);
  let word = participant && participant.split("");
  let participantName =
    participant && word[0].toUpperCase() + word.slice(1).join("");

  useEffect(() => {
    if (firstID === id) {
      setFirstChoice(true);
    }

    if (secondID === id) {
      setSecondChoice(true);
    }

    if (thirdID === id) {
      setThirdChoice(true);
    }
  }, []);

  return (
    <div className="vote-result-card">
      <div className="poll-vote-final-result-box">
        <div className="poll-participant-name-container">
          <div className="vote-participant-name-container">
            <div className="poll-item-title-box vote-participant-name-box">
              <p>{participantName}</p>
            </div>
          </div>
          <div className="poll-participant-name-box"></div>
        </div>
        <div className="poll-result-container">
          <div className="poll-item-title-container">
            <div
              className="poll-item-title-box participant-vote-result"
              style={{ backgroundColor: firstChoice ? "#EADDFF" : "#F6EDFF" }}
            >
              <div className="poll-item-title-text">
                <Done
                  className="vote-done-icon"
                  style={{ display: firstChoice ? "inline" : "none" }}
                />
                <Close
                  className="vote-close-icon"
                  style={{ display: firstChoice ? "none" : "inline" }}
                />
              </div>
            </div>
            <div
              className="poll-item-title-box participant-vote-result"
              style={{ backgroundColor: secondChoice ? "#EADDFF" : "#F6EDFF" }}
            >
              <div className="poll-item-title-text">
                <Done
                  className="vote-done-icon"
                  style={{ display: secondChoice ? "inline" : "none" }}
                />
                <Close
                  className="vote-close-icon"
                  style={{ display: secondChoice ? "none" : "inline" }}
                />
              </div>
            </div>
            <div
              className="poll-item-title-box participant-vote-result"
              style={{ backgroundColor: thirdChoice ? "#EADDFF" : "#F6EDFF" }}
            >
              <div className="poll-item-title-text">
                <Done
                  className="vote-done-icon"
                  style={{ display: thirdChoice ? "inline" : "none" }}
                />
                <Close
                  className="vote-close-icon"
                  style={{ display: thirdChoice ? "none" : "inline" }}
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
