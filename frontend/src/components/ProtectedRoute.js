import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({
  children,
}) => {
  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    return (
      <Navigate to="/" />
    );
  }

  try {
    const decoded =
      jwtDecode(token);

    if (
      decoded.exp * 1000 <
      Date.now()
    ) {
      localStorage.clear();

      return (
        <Navigate to="/" />
      );
    }
  } catch (error) {
    localStorage.clear();

    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default ProtectedRoute;