import React from "react";
import Logo from "../Media/Logo.svg";
import { useAuth } from "../Context/auth/AuthState";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {signOut,getAuth} from 'firebase/auth';
import { app } from "../firebaseConfig";
const Nav = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const authState = useAuth();
  const logout =()=>{
    signOut(auth);
    authState.setAuth({
      name:"",
      uid:"",
      token:""
    })
    navigate('/login');
  }
  return (
    <div className="nav">
      <Link to="/dashboard">
        <div className="logo">
          <div className="logo_img">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="logo_name">Stock Dekho</div>
        </div>
      </Link>{" "}
      <div className="profile">
        <div className="name">
          Hi,&nbsp;{authState.auth.name}&nbsp;&nbsp;&nbsp;
          <Tooltip title="Log Out">
            <IconButton color="error" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Nav;
