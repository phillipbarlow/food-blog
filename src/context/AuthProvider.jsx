import { useEffect, useState} from "react";
import {AuthContext}  from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if(storedToken && storedUser){
      setToken(storedToken);
      try{
        setUser(JSON.parse(storedUser))
      }catch{
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  },[])

  function loginAuth(userData) {
    const { user, token } = userData;
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    return user;
  }

  function logoutAuth() {
    setUser(null);
    setToken(null)
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    loginAuth,
    logoutAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
