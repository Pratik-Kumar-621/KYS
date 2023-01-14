import React from "react";
import { useAuth } from "../Context/auth/AuthState";
const Input = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>Input</h1>
    </div>
  );
};

export default Input;
