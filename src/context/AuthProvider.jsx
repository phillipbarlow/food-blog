import { useState} from "react";
import {AuthContext}  from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email) => {
    // In real life you’d call an API here and get user data + token
    setUser({
      name: "Phil",
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
  };
  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

