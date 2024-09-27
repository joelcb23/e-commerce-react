import { createContext, useContext, useState, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyRequest,
} from "../api/auth.api";
import Cookies from "js-cookie";
import { set } from "react-hook-form";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider" +
        "Make sure to wrap your app with AuthProvider"
    );
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [seller, setSeller] = useState("");

  const registerAuth = async (data) => {
    try {
      const response = await registerRequest(data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setSeller(response.data.user.role);
    } catch (error) {
      console.error(error);
    }
  };

  const loginAuth = async (data) => {
    try {
      const response = await loginRequest(data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setSeller(response.data.user.role);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutAuth = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
    setSeller("");
  };

  const isSeller = async () => {
    try {
      const res = await verifyRequest();
      setSeller(res.data.user.role);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkLogin();

    isSeller();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        registerAuth,
        loginAuth,
        logoutAuth,
        seller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
