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
  const [loading,setLoading] =useState(false);
  useEffect(()=>{
    setLoading(true);
    const unSubscribe = onAuthStateChanged(getAuth(app),async (user)=>{
      if(user){
        let token = await user.getIdToken();
        setAuth({
          name:user.displayName,
          uid:user.uid,
          token:token,
        })
      }
    setLoading(false);

    })
    return unSubscribe;
  },[])
  // add a loading while authState is updated...
  return (loading?<div id='loading-container' ><div id="loading"></div></div>:
    <AuthContext.Provider value={{auth,setAuth}}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  let auth = useContext(AuthContext);
  return {...auth,isAuthenticated:auth.auth.uid!=""}
};
