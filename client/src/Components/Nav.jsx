import React from "react";
import Logo from "../Media/Logo.svg";
import { useAuth } from "../Context/auth/AuthState";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
const Nav = () => {
  const auth = useAuth();
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
          Hi,&nbsp;{auth.name}&nbsp;&nbsp;&nbsp;
          <Tooltip title="Log Out">
            <IconButton color="error">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Nav;
