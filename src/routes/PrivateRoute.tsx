import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";

const PrivateRoute = () => {
  const { id, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return id ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
