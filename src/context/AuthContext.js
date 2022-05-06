import { createContext, useEffect, useState } from "react";
import { authService } from "services";

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("access_token");

  const [value, setValue] = useState();
  const fetchInfoUser = async (token) => {
    try {
      const response = await authService.getLoginInfoApi(token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchInfoUser(token);
    }
  });
  const AuthContext = createContext();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
