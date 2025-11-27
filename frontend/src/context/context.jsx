import { useState, useContext, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const value = {
    loading, error, setLoading, token, navigate, user, setError, setToken
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token", token);
    }
  }, [token]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);