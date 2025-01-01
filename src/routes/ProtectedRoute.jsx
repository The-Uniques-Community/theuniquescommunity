import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed,element , redirectPath = "/401" }) => {
  return isAllowed ? element: <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
