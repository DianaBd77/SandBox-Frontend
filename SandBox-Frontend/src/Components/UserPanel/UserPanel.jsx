import "./UserPanel.css";
import Header from "../Header/Header";
import useUsername from "../Header/useUsername";
import AvatarPro from "../Avatar/Avatar";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const UserPanel = () => {
  const [name] = useUsername();

  let word = name && name.split("");
  let username = name && word[0].toUpperCase() + word.slice(1).join("");

  return (
    <div className="panel">
      <Header name={name} />
      <div className="panel-container">
        <div className="name-container">
          <AvatarPro username={username} />
          <p className="panel-username">{username}</p>
        </div>
        <div className="brand-info-container">
          <div>
            <p className="brand-info">(+1) 222- 456-78</p>
            <p className="brand-info">info@SandBox.co</p>
            <p className="brand-info">Eaj 1st Block 1st Cross, Bangalore-56</p>
          </div>
          <div className="footer-icon-container panel-icons">
            <InstagramIcon className="icons" />
            <LinkedInIcon className="icons" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
