import "./rightbar.scss";

import defaulAvatar from "../../assets/img/defaultAvatar.png";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <span>Sugerowane dla Ciebie</span>
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <span>Frodo Baggins</span>
          </div>
          <div className="buttons">
            <button>obserwuj</button>
            <button>odrzuć</button>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <span>Frodo Baggins</span>
          </div>
          <div className="buttons">
            <button>obserwuj</button>
            <button>odrzuć</button>
          </div>
        </div>
      </div>
      <div className="container">
        <span>Najnowsze aktywności</span>
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <p>
              <span>Frodo Baggins</span> zmienil swoje zdjęcie profilowe
            </p>
          </div>
          <span>1 min. temu</span>
        </div>{" "}
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <p>
              <span>Frodo Baggins</span> zmienil swoje zdjęcie profilowe
            </p>
          </div>
          <span>1 min. temu</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <p>
              <span>Frodo Baggins</span> zmienil swoją żonę
            </p>
          </div>
          <span>10 min. temu</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src={defaulAvatar} alt="User"></img>
            <p>
              <span>Samwise Gamgee</span> dodał nowy post
            </p>
          </div>
          <span>3 min. temu</span>
        </div>
      </div>
      <div className="container">
        <span>Aktywni znajomi</span>
        <div className="user">
          <div className="userInfo">
            <div className="online" />
            <img src={defaulAvatar} alt="User"></img>
            <span>Frodo Baggins</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <div className="online" />
            <img src={defaulAvatar} alt="User"></img>
            <span>Gimli</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <div className="online" />
            <img src={defaulAvatar} alt="User"></img>
            <span>Samwise Gamgee</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <div className="online" />
            <img src={defaulAvatar} alt="User"></img>
            <span>Sauron</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <div className="online" />
            <img src={defaulAvatar} alt="User"></img>
            <span>Gandalf</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
