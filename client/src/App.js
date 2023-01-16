import React from "react";
import { AuthState, useAuth } from "./Context/auth/AuthState";
import { BrowserRouter as Router, Routes, Route,redirect, Navigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./Styles/app.scss";
import Error from "./Pages/Error";

const AuthenticatedRoute = ({children})=>{
  const auth = useAuth();
  if(!auth.isAuthenticated){
    return <Navigate to='/login' />
  }
  return children;
}

const UnAuthenticatedRoute = ({children})=>{
  const auth = useAuth();
  if(auth.isAuthenticated){
    return <Navigate to='/dashboard' />
  }
  return children;
}

const App = () => {
  return (
    <Router>
      <AuthState>
        <Routes>
          <Route path="/dashboard" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>}></Route>
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<UnAuthenticatedRoute><Login /></UnAuthenticatedRoute>}></Route>
            <Route path="signup" element={<UnAuthenticatedRoute><Signup /></UnAuthenticatedRoute>}></Route>
          </Route>
          <Route path="*" element={<AuthenticatedRoute><Error /></AuthenticatedRoute>} />
        </Routes>
      </AuthState>
    </Router>
  );
};

export default App;
