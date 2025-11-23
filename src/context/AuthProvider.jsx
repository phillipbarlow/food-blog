import { useState} from "react";
import {AuthContext}  from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 

  const logout = () => {
    setUser(null);
  };
  const value = { user, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

