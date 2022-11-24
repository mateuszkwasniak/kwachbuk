import { useContext } from "react";
import { AuthContext } from "../../context/authctx";
import { useMediaQuery } from "react-responsive";

import "./stories.scss";

import defaultAvatar from "../../assets/img/defaultAvatar.png";

//Przykladowe dane

const stories = [
  {
    id: 1,
    name: "Samwise Gamgi",
    img: "https://pbs.twimg.com/profile_images/378800000530943404/f3e680aee6a867ddf8fff1f16da9b8be_400x400.jpeg",
    img2: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 2,
    name: "Samwise Gamgi",
    img: "https://pbs.twimg.com/profile_images/378800000530943404/f3e680aee6a867ddf8fff1f16da9b8be_400x400.jpeg",
    img2: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 3,
    name: "Samwise Gamgi",
    img: "https://pbs.twimg.com/profile_images/378800000530943404/f3e680aee6a867ddf8fff1f16da9b8be_400x400.jpeg",
    img2: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: 4,
    name: "Samwise Gamgi",
    img: "https://pbs.twimg.com/profile_images/378800000530943404/f3e680aee6a867ddf8fff1f16da9b8be_400x400.jpeg",
    img2: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
];
const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: `(max-width: 480px)` });

  return (
    <div className="stories">
      <div className="story">
        <img
          src={
            currentUser?.profilepic
              ? "/uploadedImages/" + currentUser.profilepic
              : defaultAvatar
          }
          alt="User Story"
        />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.length !== 0 &&
        (isMobile
          ? stories.slice(0, 3).map((story) => (
              <div className="story" key={story.id}>
                <img src={story.img2} alt="Story"></img>
                <span>{story.name}</span>
              </div>
            ))
          : stories.map((story) => (
              <div className="story" key={story.id}>
                <img src={story.img2} alt="Story"></img>
                <span>{story.name}</span>
              </div>
            )))}
    </div>
  );
};

export default Stories;
