import React, { createContext } from "react";

export const authDataContext = createContext();

const authContextProvider = ({ children }) => {
  const serverUrl = "https://ai-mern-dev-e-commerce-master.onrender.com"; 
  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
};

export default authContextProvider;
