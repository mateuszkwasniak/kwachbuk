import "./posts.scss";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: () =>
      axios
        .get(
          userId
            ? `http://localhost:3030/posts?userId=${userId}`
            : "http://localhost:3030/posts",

          {
            withCredentials: true,
          }
        )
        .then((response) => {
          return response.data;
        }),
  });

  return (
    <div className="posts">
      {isLoading && <span>Proszę czekać, ładowanie danych...</span>}
      {error && (
        <span>{error?.response?.data || "Nie udało się załadować danych"}</span>
      )}
      {console.log(data)}
      {data && data.map((post) => <Post key={post.postid} post={post} />)}
    </div>
  );
};

export default Posts;
