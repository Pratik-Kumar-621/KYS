import React from "react";
import { Link } from "react-router-dom";
import ErrorComp from "../Components/ErrorComp";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";

const Error = () => {
  return (
    <div className="error_404">
      <Nav />
      <ErrorComp
        message={
          <>
            <span className="red">Error 404&nbsp;!&nbsp;&nbsp;</span>Page not
            found.&nbsp;
            <Link to="/dashboard">
              <Button variant="text">
                Go to Dashboard&nbsp;
                <ArrowRightAltIcon />
              </Button>
            </Link>
          </>
        }
      />
      <Footer />
    </div>
  );
};

export default Error;
