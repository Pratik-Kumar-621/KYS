import { MenuItem, Select } from "@mui/material";

import React from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Summary from "../Components/Summary";

const Dashboard = () => {
  const [personName, setPersonName] = React.useState();

  const handleChange = (e) => {};
  return (
    <div className="dashboard full_screen">
      <Nav />
      <div>
        {/* <Select defaultValue={"hh"} onChange={handleChange}>
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
        </Select> */}
        <Summary
          name="NIFTY 50"
          date="13 Jan, 2023"
          price="17972.15"
          open="17867.50"
          previousClose="17858.20"
          dayClose="17969.20"
          dayLow="17774.25"
          dayHigh="17976.40"
          yearLow="15183.40"
          yearHigh="18887.60"
          yearClose="17789.54"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
