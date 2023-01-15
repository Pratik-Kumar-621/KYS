import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../../firebaseConfig";

import AuthContext from "./authContext";

export const AuthState = (props) => {
  const [auth,setAuth] = useState({
    name: "",
    uid:"",
    token:""
  });
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(getAuth(app),async (user)=>{
      if(user){
        let token = await user.getIdToken();
        setAuth({
          name:user.displayName,
          uid:user.uid,
          token:token,
        })
      }
    })
  },[])
  // add a loading while authState is updated...
  return (
    <AuthContext.Provider value={{auth,setAuth}}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  let auth = useContext(AuthContext);
  return {...auth,isAuthenticated:auth.auth.uid!=""}
};
