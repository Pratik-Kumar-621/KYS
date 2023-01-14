import React from "react";
import Logo from "../Media/Logo.svg";

const Landing = () => {
  return (
    <div className="landing">
      <img src={Logo} alt="Logo" />

      <h1>Stock Dekho</h1>
      <p>A place for visualizing and analyzing the stocks</p>
    </div>
  );
};

export default Landing;
