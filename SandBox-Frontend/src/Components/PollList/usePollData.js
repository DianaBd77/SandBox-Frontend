import axios from "axios";
import { useState, useEffect } from "react";

const usePollData = () => {
  const [pollData, setPollData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3001/poll`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setPollData(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  }, []);

  return [pollData, errorMessage];
};

export default usePollData;
