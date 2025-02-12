import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/configs/keycloak.config";
import Cookies from "node_modules/@types/js-cookie";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); 
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html" })
      .then((authenticated) => {
        if (authenticated && keycloak.token) {
          setIsAuthenticated(true);
          setToken(keycloak.token);
          localStorage.setItem("token", keycloak.token); 
          localStorage.setItem("refreshToken", keycloak.refreshToken || "");
        }
      })
      .catch((err) => console.error("Keycloak initialization failed", err));
  }, []);

  // Đăng nhập bằng API của Keycloak
  const login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append("client_id", keycloak.clientId || "");
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    params.append("scope", "openid");
    params.append("client_secret", import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET || "");

    try {
      const response = await fetch(`${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      keycloak.token = data.access_token;
      keycloak.refreshToken = data.refresh_token;
      setToken(data.access_token);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.access_token); 
      localStorage.setItem("refreshToken", data.refresh_token || "");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    console.log("Logging out...");
  
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");
  
      const params = new URLSearchParams();
      params.append("client_id", keycloak.clientId || "");
      params.append("refresh_token", refreshToken);
      params.append("client_secret", import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET || "");
  
      // Gửi yêu cầu logout đến Keycloak
      await axios.post(
        `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
  
      // // Cập nhật state
      setIsAuthenticated(false);
      setToken(null);
  
      console.log("Logged out successfully");
  
      // // Chuyển hướng về trang login
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
