import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type PrivateRouteProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/",
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  // If nested route uses <Outlet />, render that; otherwise, render children
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
