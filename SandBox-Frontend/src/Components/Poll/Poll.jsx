import "./Poll.css";
import Header from "../Header/Header";
import VoteResult from "../VoteResult/VoteResult";
import useUsername from "../Header/useUsername";
import ShareModal from "../ShareModal/ShareModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Done, Close } from "@mui/icons-material";
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
  const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [firstItemValue, setFirstItemValue] = useState("");
  const [secondItemValue, setSecondItemValue] = useState("");
  const [thirdItemValue, setThirdItemValue] = useState("");
  const [choiceResult, setChoiceResult] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("e :>> ", event.target.value);
  };

  const getPollData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/poll/${id}`, {
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
      .get(`http://localhost:3001/item/${id}`, {
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
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };


  const getVoteResult = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/choice/id/${id}`, {
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


  let votes = choiceResult.map((data) => {
    return (
      <VoteResult
        key={data.id}
        participant={data.name}
        item={data.item}
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
            <div className="poll-page-vote-result-box">
              {votes}
            </div>
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
                        checked={selectedValue === "B"}
                        onChange={handleChange}
                        value="B"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
