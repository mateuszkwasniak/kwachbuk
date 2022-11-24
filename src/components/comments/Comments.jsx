import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import "./comments.scss";
import axios from "axios";
import moment from "moment";
import "moment/locale/pl";
import defaultAvatar from "../../assets/img/defaultAvatar.png";
import { AuthContext } from "../../context/authctx";

const Comments = ({ postId, setCommentsCount }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchComments" + postId],
    queryFn: () =>
      axios
        .get(`http://localhost:3030/comments/${postId}`, {
          withCredentials: true,
        })
        .then((response) => {
          return response.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return axios
        .post(
          `http://localhost:3030/comments`,
          {
            comment,
            postId,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Nie udało się dodać komentarza");
    },
    onSuccess: () => {
      console.log("Dodano komentarz");
      setComment("");
      queryClient.invalidateQueries(["fetchComments" + postId]);
    },
  });

  const submitCommentHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    mutation.mutate();
  };

  return (
    <div className="comments">
      <div className="writeComment">
        <img
          src={
            currentUser?.profilepic
              ? "/uploadedImages/" + currentUser.profilepic
              : defaultAvatar
          }
          alt="Current User"
        ></img>
        <form>
          <input
            type="text"
            placeholder="Skomentuj..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></input>
          <button onClick={submitCommentHandler}>Wyślij</button>
        </form>
      </div>
      {isLoading && <span>Ładowanie komentarzy</span>}
      {error && <span>Nie udało się załadować komentarzy</span>}
      {data &&
        data.map((comment) => (
          <div className="comment" key={comment.commentid}>
            <img
              src={
                comment?.profilepic
                  ? "/uploadedImages/" + comment.profilepic
                  : defaultAvatar
              }
              alt="Commenting User"
            ></img>
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.date).fromNow()}</span>
            <div></div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
