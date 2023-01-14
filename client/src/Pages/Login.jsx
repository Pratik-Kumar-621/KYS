import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import GoogleImg from "../Media/google.png";

const Login = () => {
  const [checkBox, setCheckBox] = useState();

  const checkCheckBox = (e) => {
    const checkData = e.target.checked;
    setCheckBox(checkData);
  };

  const handleLogin = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <div className="auth signup">
      <h3>Welcome Back...</h3>
      <h1>Login to your Account</h1>
      <p>
        New here?&nbsp;
        <Link to="/signup">Create free account</Link>
      </p>

      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          id="email"
          label="UserName or Email"
          type="email"
          placeholder="Eg. puneet123 or puneetXXX@abc.xyz"
          name="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        <p className="error">{errors.email && "Please enter Valid Email !"}</p>
        <Input
          id="password"
          label="Password"
          type={checkBox ? "text" : "password"}
          placeholder="Eg: **********"
          name="password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          })}
        />
        <p className="error">
          {errors.password &&
            "Password should have minimum eight characters, at least one letter, one number and one special character eg. 1234abc@"}
        </p>
        <div className="check_pass_box">
          <input
            id="checkbox"
            type="checkbox"
            onChange={checkCheckBox}
            checked={checkBox}
          />
          <label htmlFor="checkbox">Show Password</label>
        </div>

        <div className="submit-btn">
          <Button type="submit" className="submit-form">
            Login
          </Button>
          <Button className="submit_google">
            <img src={GoogleImg} alt="Google" />
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
