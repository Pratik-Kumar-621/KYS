import { MenuItem, Select } from "@mui/material";

import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Graph from "../Components/Graph";
import { useAuth } from "../Context/auth/AuthState";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [personName, setPersonName] = React.useState();
  const navigate = useNavigate();
  const {isAuthenticated } = useAuth();
  useEffect(()=>{
    if(!isAuthenticated) navigate('/login');
  },[])
  const handleChange = (e) => {};
  return (
    <div className="dashboard full_screen">
      <Nav />
      <div>
        <Select defaultValue={"hh"} onChange={handleChange}>
          <MenuItem disabled value="hh">
            Select the Stock
          </MenuItem>
          <MenuItem value="NSE">NSE</MenuItem>
          <MenuItem value="BSE">BSE</MenuItem>
          <MenuItem value="ASHOKLEY">ASHOKLEY</MenuItem>
          <MenuItem value="CIPLA">CIPLA</MenuItem>
          <MenuItem value="EICHERMOT">EICHERMOT</MenuItem>
          <MenuItem value="RELIANCE">RELIANCE</MenuItem>
          <MenuItem value="TATASTEEL">TATASTEEL</MenuItem>
        </Select>
        <Graph />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
