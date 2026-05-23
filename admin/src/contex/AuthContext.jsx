import React, { createContext } from "react";

export const authDataContext = createContext();

const authContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000"; // 🔥 EMPTY (proxy use karega)

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
};

export default authContextProvider;
