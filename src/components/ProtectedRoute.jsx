import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth/context";
import { Spinner } from "flowbite-react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      // <div className="flex justify-center items-center min-h-screen">
      //   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      // </div>
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" className="fill-[--color-btn-submit-bg]" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
