import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import GoogleImg from "../Media/google.png";

const SignUp = () => {
  const [checkBox, setCheckBox] = useState();

  const checkCheckBox = (e) => {
    const checkData = e.target.checked;
    setCheckBox(checkData);
  };

  const handleSignup = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <div className="auth login">
      <h3>Getting started ...</h3>
      <h1>Create New Account</h1>
      <p>
        Already a member?&nbsp;
        <Link to="/login">Log In</Link>
      </p>

      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="name_signup">
          <div className="name_input_f">
            <Input
              id="first_name"
              label="First Name"
              type="text"
              placeholder="Eg: Pratik"
              name="first_name"
              {...register("first_name", {
                required: true,
                maxLength: 80,
              })}
            />
            <p className="error">
              {errors.first_name && "Please enter Your First Name !"}
            </p>
          </div>
          <div className="name_input_l">
            <Input
              id="last_name"
              label="Last Name"
              type="text"
              placeholder="Eg: Kumar"
              name="last_name"
              {...register("last_name", {
                required: true,
                maxLength: 80,
              })}
            />
            <p className="error">
              {errors.last_name && "Please enter Your Last Name !"}
            </p>
          </div>
        </div>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Eg. pratikXXX@abc.xyz"
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
        <Input
          id="confirm_password"
          label="Confirm Password"
          type={checkBox ? "text" : "password"}
          placeholder="Eg: **********"
          name="confirm_password"
          {...register("confirm_password", {
            required: true,
            minLength: 8,
            maxLength: 16,
            validate: (value) => value === getValues("password"),
          })}
        />
        <p className="error">
          {errors.confirm_password &&
            "Confirm Password is not equal to passsword !"}
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
            SignUp
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

export default SignUp;
