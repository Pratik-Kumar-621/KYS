import React from "react";
import Error from "../Media/Error.svg";

const ErrorComp = ({ message }) => {
  return (
    <div className="error_page">
      <img src={Error} alt="Error" />
      <div className="message_error center">{message}</div>
    </div>
  );
};

export default ErrorComp;
