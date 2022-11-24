import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./navbar.scss";

import { AppContext } from "../../context/appctx";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import defaultAvatar from "../../assets/img/defaultAvatar.png";
import { AuthContext } from "../../context/authctx";

const NavBar = () => {
  const { darkTheme, setDarkTheme } = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const darkModeHandler = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const searchUserMutation = useMutation({
    mutationFn: (input) => {
      return axios
        .post(
          "http://localhost:3030/users/search",
          {
            input,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Wyszukiwanie nie działa");
    },
    onSuccess: (data) => {
      console.log(data);
      setSearchResults(data);
    },
  });

  const searchUserHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }
    searchUserMutation.mutate(e.target.value);
  };

  const onSearchedClickHandler = (user) => {
    if (location.pathname.includes("/profile")) {
      navigate(`/profile/${user.id}`);
      window.location.reload();
    } else {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="logo">kwachbuk</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeOutlinedIcon style={{ fontSize: "25px", cursor: "pointer" }} />
        </Link>
        {darkTheme ? (
          <WbSunnyOutlinedIcon
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={darkModeHandler}
          />
        ) : (
          <DarkModeOutlinedIcon
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={darkModeHandler}
          />
        )}
        <GridViewOutlinedIcon style={{ fontSize: "25px" }} />
        <div className="searchWrapper">
          <div className="search">
            <input
              placeholder="Szukaj..."
              type="text"
              onChange={searchUserHandler}
              value={input}
              autoFocus
            ></input>
            <SearchOutlinedIcon style={{ fontSize: "20px" }} />
          </div>
          {searchResults.length > 0 && input !== "" && (
            <div className="searchResults">
              {searchResults.map((user) => (
                <div
                  className="searchedUser"
                  onClick={onSearchedClickHandler.bind(null, user)}
                >
                  <PersonSearchIcon style={{ fontSize: "20px" }} />
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon style={{ fontSize: "25px" }} />
        <EmailOutlinedIcon style={{ fontSize: "25px" }} />
        <NotificationsOutlinedIcon style={{ fontSize: "25px" }} />

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
      </div>
    </div>
  );
};

export default NavBar;
