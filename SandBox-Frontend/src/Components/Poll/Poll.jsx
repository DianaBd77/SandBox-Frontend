import "./Poll.css";
import Header from "../Header/Header";
import VoteResult from "../VoteResult/VoteResult";
import useUsername from "../Header/useUsername";
import ShareModal from "../ShareModal/ShareModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import Edit from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Poll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [name] = useUsername();
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [firstItemValue, setFirstItemValue] = useState("");
  const [secondItemValue, setSecondItemValue] = useState("");
  const [thirdItemValue, setThirdItemValue] = useState("");
  const [firstItemID, setFirstItemID] = useState(0);
  const [secondItemID, setSecondItemID] = useState(0);
  const [thirdItemID, setThirdItemID] = useState(0);
  const [choiceResult, setChoiceResult] = useState([]);
  const [pollID, setPollID] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getPollData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://dianabehshad.xyz:80/api/poll/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let title = res.data[0].title;
        setTitle(title);
        let description = res.data[0].description;
        setDescription(description);
        let imgURL = res.data[0].img_url;
        setImgURL(imgURL);
        let id = res.data[0].id;
        setPollID(id);
        getItemData(id);
        getVoteResult(id);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  useEffect(() => {
    getPollData();
  }, []);

  const getItemData = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://dianabehshad.xyz:80/api/item/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let firstItemName = res.data[0].item;
        setFirstItemValue(firstItemName.toUpperCase());
        let secondItemName = res.data[1].item;
        setSecondItemValue(secondItemName.toUpperCase());
        let thirdItemName = res.data[2].item;
        setThirdItemValue(thirdItemName.toUpperCase());

        let firstID = res.data[0].id;
        setFirstItemID(firstID);
        let secondID = res.data[1].id;
        setSecondItemID(secondID);
        let thirdID = res.data[2].id;
        setThirdItemID(thirdID);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const getVoteResult = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://dianabehshad.xyz:80/api/choice/id/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let choices = res.data;
        setChoiceResult(choices);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const insertName = () => {
    if (participantName === "") {
      setError("Name Filed Can't Be Empty!");
      return;
    }

    let name = `${participantName}`;
    const token = localStorage.getItem("token");
    axios
      .post(`http://dianabehshad.xyz:80/api/participant`, {
        poll_id: pollID,
        name: name,
      })
      .then((res) => {
        console.log("res :>> ", res);
        const id = res.data[0].insertId;
        insertVote(id);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const insertVote = (id) => {
    console.log("selectedValue :>> ", selectedValue);
    let itemID = 0;
    if (selectedValue === "a") {
      itemID = firstItemID;
    }

    if (selectedValue === "b") {
      itemID = secondItemID;
    }
    if (selectedValue === "c") {
      itemID = thirdItemID;
    }

    axios
      .post(`http://dianabehshad.xyz:80/api/choice`, {
        poll_id: pollID,
        participant_id: id,
        item_id: itemID,
      })
      .then(() => {
        getVoteResult(pollID);
        setParticipantName("");
        setSelectedValue("a");
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  let votes = choiceResult.map((data) => {
    return (
      <VoteResult
        key={data.id}
        participant={data.name}
        item={data.item}
        id={data.id}
        firstID={firstItemID}
        secondID={secondItemID}
        thirdID={thirdItemID}
      />
    );
  });

  return (
    <div className="page-container">
      <Header name={name} />
      <div className="poll-page">
        <div className="poll-page-container">
          <div className="poll-img-container">
            <img className="poll-page-img" src={imgURL}></img>
          </div>
          <div className="poll-text-container">
            <div className="poll-page-header-section">
              <h1 className="poll-header-text">{title}</h1>
              <div className="poll-page-icon-box">
                <ShareModal className="card-icons" link={id} />
                <Edit
                  className="card-icons"
                  onClick={() => {
                    navigate(`/manage-poll/${id}`);
                  }}
                />
                <DeleteModal
                  className="card-icons"
                  link={id}
                  id={0}
                  fetchData={() => {
                    navigate("/list");
                  }}
                />
              </div>
            </div>
            <p className="poll-description-text">{description}</p>
          </div>
          <div className="poll-vote-container">
            <div className="vote-header-box">
              <div className="poll-participant-name-container">
                <div className="empty-container"></div>
                <div className="poll-participant-name-box"></div>
              </div>
              <div className="poll-result-container">
                <div className="poll-item-title-container">
                  <div className="poll-item-title-box">
                    <p className="poll-item-title-text">{firstItemValue}</p>
                  </div>
                  <div className="poll-item-title-box">
                    <p className="poll-item-title-text">{secondItemValue}</p>
                  </div>
                  <div className="poll-item-title-box">
                    <p className="poll-item-title-text">{thirdItemValue}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="poll-page-vote-result-box">{votes}</div>
            <div className="poll-insert-vote-box">
              <div className="poll-participant-name-container">
                <div className="vote-participant-name-container">
                  <div className="poll-item-title-box insert-participant-name-box">
                    <TextField
                      className="text-filed"
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      onChange={(e) => setParticipantName(e.target.value)}
                      value={participantName}
                    />
                  </div>
                </div>
                <div className="poll-participant-name-box"></div>
              </div>
              <div className="poll-result-container">
                <div className="poll-item-title-container">
                  <div className="poll-item-title-box vote-radio-button">
                    <div className="poll-item-title-text">
                      <Radio
                        checked={selectedValue === "a"}
                        onChange={handleChange}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </div>
                  </div>
                  <div className="poll-item-title-box vote-radio-button">
                    <div className="poll-item-title-text">
                      <Radio
                        checked={selectedValue === "b"}
                        onChange={handleChange}
                        value="b"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                    </div>
                  </div>
                  <div className="poll-item-title-box vote-radio-button">
                    <div className="poll-item-title-text">
                      <Radio
                        checked={selectedValue === "c"}
                        onChange={handleChange}
                        value="c"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "C" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="poll-vote-error">{error}</p>
            <Button
              variant="contained"
              className="manage-poll-btn poll-page-submit-button"
              onClick={insertName}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
