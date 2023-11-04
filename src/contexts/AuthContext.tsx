import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface AuthContextProps {
  id: string;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  id: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setId(decodedToken.id);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log(axios.defaults.headers.common);

    const decodedToken = jwtDecode<DecodedToken>(token);
    setId(decodedToken.id);

    localStorage.setItem("token", token);
  };

  const logout = () => {
    setId("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ id, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
