import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "@/configs/keycloak.config";

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
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    keycloak.logout();
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token"); 
    console.log("Logged out");
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
