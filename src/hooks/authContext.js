import { createContext, useEffect, useState } from "react";

export const AUTH_LOCAL_STORAGE = "user_auth";
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const getAuthState = async () => {
    const tokens = localStorage.getItem(AUTH_LOCAL_STORAGE);
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      setAuth(parsedTokens);
    } else {
      setAuth(null);
    }
  };

  const setAuthState = (auth) => {
    localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(auth));
    setAuth(auth);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_LOCAL_STORAGE);
    setAuth(null);
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
