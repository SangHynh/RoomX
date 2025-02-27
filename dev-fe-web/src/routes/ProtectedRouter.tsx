import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

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
