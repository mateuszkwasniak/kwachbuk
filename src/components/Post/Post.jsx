import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import "moment/locale/pl";

import "./post.scss";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import defaultAvatar from "../../assets/img/defaultAvatar.png";
import Comments from "../comments/Comments";
import { AuthContext } from "../../context/authctx";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);

  const queryClient = useQueryClient();

  //pobieranie wszystkich likeow dla danego posta
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchLikes" + post.postid],
    queryFn: () =>
      axios
        .get(`http://localhost:3030/likes/${post.postid}`, {
          withCredentials: true,
        })
        .then((response) => {
          return response.data;
        }),
  });

  //dodawanie likea przez uzytkownika
  const addLikeMutation = useMutation({
    mutationFn: () => {
      return axios
        .put(`http://localhost:3030/likes/${post.postid}`, null, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Nie udało się dodać lajka");
    },
    onSuccess: () => {
      console.log("Dodano lajk");
      queryClient.invalidateQueries(["fetchLikes" + post.postid]);
    },
  });

  //usuwanie likea przez uzytkownika
  const deleteLikeMutation = useMutation({
    mutationFn: () => {
      return axios
        .delete(`http://localhost:3030/likes/${post.postid}`, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Nie udało się usunąć lajka");
    },
    onSuccess: () => {
      console.log("Usunięto lajk");
      queryClient.invalidateQueries(["fetchLikes" + post.postid]);
    },
  });

  const likeClickHandler = () => {
    if (
      data &&
      data.filter((like) => like.userid === currentUser.id).length > 0
    ) {
      deleteLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
  };

  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          {console.log(post.profilepic)}
          <img
            src={
              post?.profilepic
                ? "/uploadedImages/" + post.profilepic
                : defaultAvatar
            }
            alt="Post"
          ></img>
          <div className="details">
            <Link
              to={`/profile/${post.userid}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="name">{post.name}</span>
            </Link>
            <span className="date">{moment(post.date).fromNow()}</span>
          </div>
        </div>
        <MoreHorizIcon style={{ fontSize: "25px" }}></MoreHorizIcon>
      </div>
      <div className="content">
        <p>{post.desc}</p>
        {post?.img && <img src={"/uploadedImages/" + post?.img} alt="Post" />}
      </div>
      <div className="info">
        <div className="iconBox" onClick={likeClickHandler}>
          {data &&
          data.filter((like) => like.userid === currentUser.id).length > 0 ? (
            <FavoriteOutlinedIcon
              style={{
                fontSize: "25px",
                color: "red",
              }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ fontSize: "25px" }} />
          )}
          {error && "? polubień"}
          {data && data.length + " polubień"}
        </div>
        <div
          className="iconBox"
          onClick={() => setShowComments((show) => !show)}
        >
          <TextsmsOutlinedIcon style={{ fontSize: "25px" }} />
          Komentarze
        </div>
        <div className="iconBox">
          <ShareOutlinedIcon style={{ fontSize: "25px" }} /> Udostępnij
        </div>
      </div>
      {showComments && <Comments postId={post.postid}></Comments>}
    </div>
  );
};

export default Post;
