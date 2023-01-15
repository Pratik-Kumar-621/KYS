import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Landing from "../Components/Landing";

const Auth = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/login')
  },[])
  return (
    <div className="home_page">
      <Landing />
      <Outlet />
    </div>
  );
};

export default Auth;
