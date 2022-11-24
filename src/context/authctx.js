import { useEffect, createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post(
      "http://localhost:3030/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(response.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser || null));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
