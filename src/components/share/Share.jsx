import { useContext, useState } from "react";
import { AuthContext } from "../../context/authctx";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import "./share.scss";

import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";

import defaultAvatar from "../../assets/img/defaultAvatar.png";
import axios from "axios";

const Share = () => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form) => {
      return axios
        .post("http://localhost:3030/posts", form, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Nie udało się dodać posta");
    },
    onSuccess: () => {
      console.log("Post added");
      setFile(null);
      setDesc("");
      queryClient.invalidateQueries(["fetchPosts"]);
    },
  });

  const onPostSubmitHandler = () => {
    const form = new FormData();
    if (file) form.append("postPic", file);
    form.append("desc", desc);
    mutation.mutate(form);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                currentUser?.profilepic
                  ? "/uploadedImages/" + currentUser.profilepic
                  : defaultAvatar
              }
              alt="User"
            />
            <input
              type="text"
              placeholder={`O czym myślisz ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="file"
                alt="Mini"
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <PhotoSizeSelectActualOutlinedIcon
                  style={{
                    fontSize: "25px",
                  }}
                />
                <span>Dodaj zdjęcie</span>
              </div>
            </label>
            <div className="item">
              <LocationOnOutlinedIcon style={{ fontSize: "25px" }} />
              <span>Dodaj lokalizację</span>
            </div>
            <div className="item">
              <Diversity3OutlinedIcon style={{ fontSize: "25px" }} />
              <span>Oznacz znajomego</span>
            </div>
          </div>
          <div className="right">
            <button onClick={onPostSubmitHandler}>Udostępnij</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
