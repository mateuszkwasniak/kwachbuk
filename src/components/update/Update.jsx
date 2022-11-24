import { Fragment, useState, useContext } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./update.scss";
import { AuthContext } from "../../context/authctx";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const initialState = {
  name: "",
  location: "",
  website: "",
};

const Update = ({ setShowUpdate, user }) => {
  //osobne staty dla plików
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { setCurrentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState(initialState);

  const inputChangeHandler = (e) => {
    setInputs((prevInputs) => {
      return { ...prevInputs, [e.target.name]: e.target.value };
    });
  };

  const mutation = useMutation({
    mutationFn: (form) => {
      return axios
        .post("http://localhost:3030/users", form, {
          withCredentials: true,
        })
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error?.response?.data || "Nie udało się wprowadzić zmian");
    },
    onSuccess: (data) => {
      console.log("Zmiany wprowadzone");
      setCurrentUser((prev) => {
        return {
          ...prev,
          name:
            inputs.name !== "" && inputs.name !== prev.name
              ? inputs.name
              : prev.name,
          profilepic:
            data.length > 0 && data !== prev.profilepic
              ? data
              : prev.profilepic,
        };
      });
      setCoverPic(null);
      setProfilePic(null);
      setInputs(initialState);
      queryClient.invalidateQueries(["fetchProfile"]);
    },
  });

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    if (coverPic) form.append("coverPic", coverPic);
    if (profilePic) form.append("profilePic", profilePic);

    if (inputs.name !== "") form.append("name", inputs.name);
    if (inputs.location !== "") form.append("location", inputs.location);
    if (inputs.website !== "") form.append("website", inputs.website);

    mutation.mutate(form);
    setShowUpdate(false);
  };

  return (
    <Fragment>
      <div className="updateBackground" />
      <div className="updateContent">
        <button className="closeBtn" onClick={setShowUpdate.bind(null, false)}>
          X
        </button>
        <form onSubmit={submitUpdateHandler}>
          <label htmlFor="coverPic">
            Zmień zdjęcie w tle{" "}
            <PhotoSizeSelectActualOutlinedIcon
              style={{
                fontSize: "25px",
                color: coverPic && "rebeccapurple",
              }}
            />
          </label>
          <input
            id="coverPic"
            type="file"
            name="coverPic"
            onChange={(e) => setCoverPic(e.target.files[0])}
            style={{ display: "none" }}
          ></input>
          <label htmlFor="profilePic">
            Zmień zdjęcie profilowe
            <PersonOutlinedIcon
              style={{
                fontSize: "25px",
                color: profilePic && "rebeccapurple",
              }}
            />
          </label>
          <input
            id="profilePic"
            type="file"
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
            style={{ display: "none" }}
          ></input>
          <input
            type="text"
            name="name"
            placeholder="Imię"
            onChange={(e) => inputChangeHandler(e)}
            value={inputs.name}
          ></input>
          <input
            type="text"
            name="location"
            placeholder="Lokalizacja"
            onChange={(e) => inputChangeHandler(e)}
            value={inputs.location}
          ></input>
          <input
            type="text"
            name="website"
            placeholder="Stronka"
            onChange={(e) => inputChangeHandler(e)}
            value={inputs.website}
          ></input>
          <button type="submit">Wyślij</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Update;
