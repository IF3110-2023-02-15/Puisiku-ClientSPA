import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { id, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return id ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
