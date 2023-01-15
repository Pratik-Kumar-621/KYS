import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import GoogleImg from "../Media/google.png";
import {signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { getAuth } from "firebase/auth";
import { app ,db} from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Context/auth/AuthState";

const Login = () => {
  const [checkBox, setCheckBox] = useState();
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const goToDashboard = ()=>navigate('/dashboard');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const checkCheckBox = (e) => {
    const checkData = e.target.checked;
    setCheckBox(checkData);
  };

  const handleLogin =  async(data) => {
    console.log(data);
    try {
      
      let userCred = await signInWithEmailAndPassword(auth,data.email,data.password);
      let docSnap = await getDoc(doc(db,'users',userCred.user.uid))
      console.log(docSnap.data());
      // set context
      goToDashboard();
    } catch (error) {
      if(error.code == 'auth/user-not-found'){
        setError('Email not found !')
      }
      if(error.code == 'auth/wrong-password') {
        setError('Wrong Password!')
      }
      
    }

  };
  const handleGoogleSignIn = async (e)=>{
    try {
      provider.addScope('profile');
      provider.addScope('email');
      let userCred = await signInWithPopup(auth,provider);
      goToDashboard();
    } catch (error) {
      // error
    }

  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const {isAuthenticated } = useAuth();
  useEffect(()=>{
    if(isAuthenticated) navigate('/dashboard');
  },[])
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
          label="Email"
          type="email"
          placeholder="himanshuXXX@abc.xyz"
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
          <Button className="submit_google" onClick={handleGoogleSignIn}>
            <img src={GoogleImg} alt="Google" />
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
