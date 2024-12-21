/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { AUTH_URLS, axiosInstance } from "../services/urls";

interface AuthData {
  saveLoginData: () => void;
  loginData: any;
  logout: () => void;
}
export const AuthContext = createContext<AuthData | any>(null);

export default function AuthContextProvider(props: any) {
  const [loginData, setLoginData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const saveLoginData = () => {
    const encodedToken: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(encodedToken);
    
    if(loginData) {
      getCurrentUser()
  }
    setLoginData(decodedToken);
  };


  const getCurrentUser = ()=>{
    axiosInstance.get(AUTH_URLS.get_current_user(loginData?._id)).then((response)=>{
      console.log(response?.data?.data.user.profileImage);
      setUserName(response?.data?.data?.user?.userName)
      setProfileImage(response?.data?.data.user.profileImage)
      
    }).catch((err)=>{
      console.log(err);
      
    })

  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();

    
      
 
    }
  }, [loginData?.role]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
  };

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, logout,userName,profileImage }}>
      {props.children}
    </AuthContext.Provider>
  );
}