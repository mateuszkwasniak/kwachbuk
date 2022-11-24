import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authctx";

import "./leftbar.scss";
import Friends from "../../assets/img/1.png";
import Groups from "../../assets/img/2.png";
import Market from "../../assets/img/3.png";
import Watch from "../../assets/img/4.png";
import Memories from "../../assets/img/5.png";
import Events from "../../assets/img/6.png";
import Gaming from "../../assets/img/7.png";
import Gallery from "../../assets/img/8.png";
import Videos from "../../assets/img/9.png";
import Messages from "../../assets/img/10.png";
import Tutorials from "../../assets/img/11.png";
import Courses from "../../assets/img/12.png";
import Fund from "../../assets/img/13.png";
import defaultAvatar from "../../assets/img/defaultAvatar.png";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="leftBar">
      <div className="menu">
        <div
          className="user"
          onClick={() => {
            if (location.pathname.includes("/profile")) {
              navigate(`/profile/${currentUser.id}`);
              window.location.reload();
            } else {
              navigate(`/profile/${currentUser.id}`);
            }
          }}
        >
          <img
            src={
              currentUser?.profilepic
                ? "/uploadedImages/" + currentUser.profilepic
                : defaultAvatar
            }
            alt="User"
          ></img>
          <span>{currentUser.name}</span>
        </div>

        <div className="item">
          <img src={Friends}></img>
          <span>Znajomi</span>
        </div>
        <div className="item">
          <img src={Groups}></img>
          <span>Grupy</span>
        </div>
        <div className="item">
          <img src={Market}></img>
          <span>Market</span>
        </div>
        <div className="item">
          <img src={Watch}></img>
          <span>Filmy</span>
        </div>
        <div className="item">
          <img src={Memories}></img>
          <span>Wspomnienia</span>
        </div>
      </div>
      <div className="menu">
        <span className="title">Na skróty</span>
        <div className="item">
          <img src={Events}></img>
          <span>Wydarzenia</span>
        </div>
        <div className="item">
          <img src={Gaming}></img>
          <span>Gry</span>
        </div>
        <div className="item">
          <img src={Gallery}></img>
          <span>Galeria</span>
        </div>
        <div className="item">
          <img src={Videos}></img>
          <span>Filmy</span>
        </div>
        <div className="item">
          <img src={Messages}></img>
          <span>Wiadomości</span>
        </div>
      </div>
      <div className="menu">
        <span className="title">Inne</span>
        <div className="item">
          <img src={Fund}></img>
          <span>Zrzutki</span>
        </div>
        <div className="item">
          <img src={Tutorials}></img>
          <span>Tutoriale</span>
        </div>
        <div className="item">
          <img src={Courses}></img>
          <span>Kursy</span>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
