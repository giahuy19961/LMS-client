import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { token, loading } = useSelector((state) => state.authReducer);

  const [context, setValueContext] = useState();

  const fetchInfoUser = async (token) => {
    try {
      const response = await userService.getInfo(token);
      console.log(response);
      setValueContext({ ...context, userInfo: response.data.data.info });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchInfoUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ context, setValueContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
