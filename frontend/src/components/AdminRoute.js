import { Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Only lets admins through. Non-admins are sent to the dashboard.
// NOTE: this is a UX convenience only. Real protection is on the
// backend (authMiddleware + adminMiddleware on every /api/admin route).
const AdminRoute = ({ children }) => {

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  return (

    <ProtectedRoute>

      {user?.role === "admin"
        ? children
        : <Navigate to="/dashboard" />}

    </ProtectedRoute>

  );

};

export default AdminRoute;
