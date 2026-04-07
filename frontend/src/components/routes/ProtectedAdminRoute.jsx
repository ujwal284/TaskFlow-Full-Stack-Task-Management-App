import { Navigate } from "react-router-dom";
import { getStoredUser, getStoredToken } from "../../utils/auth";

function ProtectedAdminRoute({ children }) {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;