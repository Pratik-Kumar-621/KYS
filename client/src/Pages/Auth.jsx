import React from "react";
import { Outlet } from "react-router-dom";
import Landing from "../Components/Landing";

const Auth = () => {
  return (
    <div className="home_page">
      <Landing />
      <Outlet />
    </div>
  );
};

export default Auth;
