import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { id, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return id ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
