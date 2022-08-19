import axios from "axios";
import { useState, useEffect } from "react";

const useUsername = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://dianabehshad.xyz:80/api/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const username = res.data[0].username;
        setName(username);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return [name];
};

export default useUsername;
