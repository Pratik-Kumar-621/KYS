import React from "react";
import { AuthState } from "./Context/auth/AuthState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Styles/app.scss";
import Error from "./Pages/Error";

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
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthState>
    </Router>
  );
};

export default App;
