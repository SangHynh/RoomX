import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/configs/keycloak.config";
import Cookies from "js-cookie";
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
    return !!Cookies.get("token"); 
  });
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html" })
      .then((authenticated) => {
        if (authenticated && keycloak.token) {
          setIsAuthenticated(true);
          setToken(keycloak.token);
          Cookies.set("token", keycloak.token, { expires: 1, secure: true, sameSite: "Strict" }); 
          Cookies.set("refreshToken", keycloak.refreshToken || "", { expires: 1, secure: true, sameSite: "Strict" });
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
      const response = await axios.post(
        `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`,
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const data = response.data;
      keycloak.token = data.access_token;
      keycloak.refreshToken = data.refresh_token;
      setToken(data.access_token);
      setIsAuthenticated(true);

      // Lưu token vào cookie
      Cookies.set("token", data.access_token, { expires: 1/24, secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", data.refresh_token || "", { expires: 7, secure: true, sameSite: "Strict" });

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    console.log("Logging out...");
  
    try {
      const refreshToken = Cookies.get("refreshToken");
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
  
      // Xóa token khỏi cookie
      Cookies.remove("token");
      Cookies.remove("refreshToken");
  
      // Cập nhật state
      setIsAuthenticated(false);
      setToken(null);
  
      console.log("Logged out successfully");

      // Chuyển hướng về trang login
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
