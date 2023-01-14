import React from "react";
import { AuthState } from "./Context/auth/AuthState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Styles/app.scss";

const App = () => {
  return (
    <Router>
      <AuthState>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </AuthState>
    </Router>
  );
};

export default App;
