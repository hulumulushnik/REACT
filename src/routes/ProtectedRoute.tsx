import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  allowedRoles?: ("admin" | "teacher" | "student")[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; // Або сторінка 403
  }

  return <Outlet />;
};

export default ProtectedRoute;
