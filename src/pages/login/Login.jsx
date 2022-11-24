import "./login.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authctx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setInputs((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (error) {
      setMessage(error?.response?.data || "Coś poszło nie tak...");
    }

    navigate("/");
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Kwachbuk</h1>
          <p>
            Witaj na Kwachbuku - platformie imitującej popularne social media,
            wbijaj śmiało!
          </p>
          <span>Nie masz jeszcze konta?</span>
          <button onClick={() => navigate("/register")}>Zarejstruj się</button>
        </div>
        <div className="right">
          <h2>Logowanie</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Login"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
            ></input>
            <input
              type="password"
              placeholder="Hasło"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
            ></input>
            <button type="submit">Zaloguj się</button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
