import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import { Spinner } from "flowbite-react";

const AuthProtection = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="info" />
      </div>
    );
  }

  // Redirect to home if authenticated
  if (user) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return <Outlet />;
};

export default AuthProtection;
