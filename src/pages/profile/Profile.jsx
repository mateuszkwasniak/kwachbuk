import React, { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authctx";
import axios from "axios";
import "./profile.scss";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";

import defaultAvatar from "../../assets/img/defaultAvatar.png";
import bcgDemo from "../../assets/img/bcgDemo.jpg";

const Profile = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const queryClient = useQueryClient();

  //pobieranie danych użytkownika
  const userProfileQuery = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: () =>
      axios.get(`http://localhost:3030/users/find/${id}`).then((response) => {
        return response.data;
      }),
  });

  //pobieranie danych o uzytkownikach followujacych
  const userFollowersQuery = useQuery({
    queryKey: ["userFollowers"],
    queryFn: () =>
      axios
        .get(`http://localhost:3030/relationships/${id}`)
        .then((response) => {
          return response.data;
        }),
  });

  //mutacja pozwalajaca na obserwowanie uzytkownika
  const followMutation = useMutation({
    mutationFn: () => {
      return axios
        .put(`http://localhost:3030/relationships/${id}`, null, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(
        error?.response?.data || "Nie udało się zaobserwować użytkownika"
      );
    },
    onSuccess: () => {
      console.log("Zaobserwowany");
      queryClient.invalidateQueries(["userFollowers"]);
    },
  });

  //mutacja koncząca obserwowanie
  const unfollowMutation = useMutation({
    mutationFn: () => {
      return axios
        .delete(`http://localhost:3030/relationships/${id}`, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(
        error?.response?.data || "Nie udało się przestać obserwować użytkownika"
      );
    },
    onSuccess: () => {
      console.log("Odobserwowany");
      queryClient.invalidateQueries(["userFollowers"]);
    },
  });

  const followClickHandler = () => {
    userFollowersQuery?.data && userFollowersQuery.data.includes(currentUser.id)
      ? unfollowMutation.mutate()
      : followMutation.mutate();
  };

  return (
    <React.Fragment>
      {userProfileQuery.isLoading && <span>Ładowanie...</span>}
      {userProfileQuery.error && <span>Coś poszło źle...</span>}
      {userProfileQuery.data && (
        <div className="profile">
          <div className="userImages">
            <img
              className="coverImg"
              src={
                userProfileQuery?.data?.coverpic
                  ? "/uploadedImages/" + userProfileQuery.data.coverpic
                  : bcgDemo
              }
              alt="Cover"
            ></img>
            <img
              className="profileImg"
              src={
                userProfileQuery?.data?.profilepic
                  ? "/uploadedImages/" + userProfileQuery.data.profilepic
                  : defaultAvatar
              }
              alt="Profile"
            ></img>
          </div>
          <div className="userDetailsContainer">
            <div className="userDetails">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon style={{ fontSize: "40px" }} />
                </a>
                <a href="http://linkedin.com">
                  <LinkedInIcon style={{ fontSize: "40px" }} />
                </a>
                <a href="http://instagram.com">
                  <InstagramIcon style={{ fontSize: "40px" }} />
                </a>
              </div>
              <div className="mid">
                <span>{userProfileQuery.data.name || "Frodo Baggins"}</span>
                <div className="userInfo">
                  <div className="item">
                    <PlaceIcon />
                    <span>{userProfileQuery.data.location}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{userProfileQuery.data.website}</span>
                  </div>
                </div>
                {userProfileQuery.data.id === currentUser.id ? (
                  <button onClick={setShowUpdate.bind(null, true)}>
                    Aktualizuj
                  </button>
                ) : (
                  <button onClick={followClickHandler}>
                    {userFollowersQuery?.data?.includes(currentUser.id)
                      ? "Zapomnij"
                      : "Obserwuj"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon style={{ fontSize: "40px" }} />
                <MoreVertIcon style={{ fontSize: "40px" }} />
              </div>
            </div>
            <Posts userId={id} />
          </div>
          {showUpdate && (
            <Update
              setShowUpdate={setShowUpdate}
              user={userProfileQuery.data}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
