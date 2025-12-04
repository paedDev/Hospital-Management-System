import { useState, useContext, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const handleSetExpanded = () => {
    setExpanded((prev) => !prev);
  };
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token", token);
    }
  }, [token]);

  const login = (newtoken, userData) => {
    setToken(newtoken);
    setUser(userData);
    setTimeout(() => {
      if (userData?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (userData?.role === "doctor") {
        navigate("/doctor/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }, 100);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    localStorage.removeItem("user");
    navigate("/");
  };
  const value = {
    loading, error, login, setLoading, token, navigate, user, setError, setToken, expanded, setExpanded, handleSetExpanded, isAuthenticated: Boolean(token), logout, theme,
    toggleTheme,
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);