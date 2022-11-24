import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(
    JSON.parse(localStorage.getItem("darkTheme")) || false
  );

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  return (
    <AppContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </AppContext.Provider>
  );
};
