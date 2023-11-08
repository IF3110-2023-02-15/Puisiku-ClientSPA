import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  id: string;
  imagePath: string;
  login: (token: string) => void;
  logout: () => void;
  updateProfileImage: (newImagePath: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  id: string;
  exp: number;
  imagePath: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedImagePath = localStorage.getItem("imagePath");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now().valueOf() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        setId("");
        setImagePath("");
        navigate("/login");
      } else {
        setId(decodedToken.id);
        setImagePath(storedImagePath || decodedToken.imagePath);
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = (token: string) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    const decodedToken = jwtDecode<DecodedToken>(token);
    setId(decodedToken.id);
    setImagePath(decodedToken.imagePath);

    localStorage.setItem("token", token);
  };

  const logout = () => {
    setId("");
    setImagePath("");
    localStorage.removeItem("token");
    localStorage.removeItem("imagePath");
  };

  const updateProfileImage = (newImagePath: string) => {
    setImagePath(newImagePath);
    localStorage.setItem("imagePath", newImagePath);
  };

  return (
    <AuthContext.Provider
      value={{ id, imagePath, login, logout, updateProfileImage, loading }}
    >
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
