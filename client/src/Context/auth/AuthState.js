import React, { useContext } from "react";

import AuthContext from "./authContext";

export const AuthState = (props) => {
  const state = {
    name: "Pratik Kumar",
  };
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
