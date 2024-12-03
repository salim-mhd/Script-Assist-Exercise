import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  // If the user is authenticated, redirect to /landing when trying to access login
  if (isAuthenticated && window.location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  // If not authenticated, redirect to login when trying to access protected resources
  if (!isAuthenticated && window.location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the requested page (children)
  return children;
};

export default ProtectedRoute;
