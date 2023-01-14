import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div>
      <Outlet />
      <h1>Auth</h1>
    </div>
  );
};

export default Auth;
