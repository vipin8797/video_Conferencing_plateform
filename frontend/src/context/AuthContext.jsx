import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusCodes as httpStatus } from "http-status-codes";

export const AuthContext = createContext(null);

const client = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL+"/user"
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token,setToken] = useState(localStorage.getItem("token") || null);
  //after succesful login //store token in both localStorange and state
//   setToken(res.data.token);
// localStorage.setItem("token", res.data.token);
    
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const res = await client.post("/register", { name, username, password });
      if (res.status === httpStatus.CREATED) return res.data.message;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await client.post("/login", { username, password });
      if (res.status === httpStatus.OK) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.message);
        setUserData(res.data.user);
        // router("/dashboard"); // ✅ navigate after login
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin,token,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

