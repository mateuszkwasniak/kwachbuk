import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      inputs.username.length === 0 ||
      inputs.email.length === 0 ||
      inputs.password.length === 0 ||
      inputs.name.length === 0
    ) {
      setMessage("Proszę wypełnić wszystkie pola");
      return;
    }

    setMessage("Proszę czekać, trwa tworzenie konta...");

    try {
      await axios.post("http://localhost:3030/auth/register", inputs);
      setTimeout(
        setMessage.bind(null, "Twoje konto zostało utworzone :)"),
        3000
      );
    } catch (error) {
      setTimeout(
        setMessage.bind(
          null,
          `${error?.response?.data || "Coś poszło nie tak..."}`
        ),
        3000
      );
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Kwachbuk</h1>
          <p>
            Witaj na Kwachbuku - platformie imitującej popularne social media,
            wbijaj śmiało!
          </p>
          <span>Masz już konto?</span>
          <button onClick={() => navigate("/login")}>Zaloguj się</button>
        </div>
        <div className="right">
          <h2>Rejestracja</h2>
          <form onSubmit={handleRegisterFormSubmit}>
            <input
              type="text"
              placeholder="Login"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
            ></input>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
            ></input>
            <input
              type="password"
              placeholder="Hasło"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
            ></input>
            <input
              type="text"
              placeholder="Imię"
              name="name"
              onChange={handleInputChange}
              value={inputs.name}
            ></input>
            <button type="submit">Zarejestruj się</button>
          </form>
          {message.length > 0 && (
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "rebeccapurple",
              }}
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
