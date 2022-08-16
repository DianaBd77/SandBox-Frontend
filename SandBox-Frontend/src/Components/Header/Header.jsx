import "./Header.css";
import AvatarPro from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";

const Header = ({ name }) => {
  const navigate = useNavigate();
  let word = name.split("");
  let username = name && word[0].toUpperCase() + word.slice(1).join("");

  return (
    <div className="header-component">
      <div className="header-container">
        <h1 className="logo header-logo">SandBox</h1>
        <div className="app-bar">
          <p
            className="app-bar-text"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
          <p
            className="app-bar-text"
            onClick={() => {
              navigate("/list");
            }}
          >
            Poll List
          </p>
          <p
            className="app-bar-text"
            onClick={() => {
              navigate("/create-poll");
            }}
          >
            Create +
          </p>
          <AvatarPro username={username} />
        </div>
      </div>
    </div>
  );
};

export default Header;
