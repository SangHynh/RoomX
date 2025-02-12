import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";

const ProtectedRoute = () => {
  const { isAuthenticated, token, logout } = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      /* Kiểm tra token tồn tại */
      if (!token) {
        logout(); 
        return;
      }
      /* Kiểm tra token hợp lệ */
      try {
        await axios.post(
          `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Invalid token, logging out:", error);
        logout(); 
      }
    };

    validateToken();
  }, [token, logout]);

  return isAuthenticated && token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
