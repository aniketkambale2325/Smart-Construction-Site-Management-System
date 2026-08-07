import { createContext, useContext, useState, type ReactNode } from "react";
import { loginRequest } from "../api/authApi.js";
import {
  clearAuthStorage,
  getUsernameFromToken,
} from "../utils/authStorage.js";

interface User {
  token: string;
  role: string;
  userId: string;
  username: string;
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (!token || !role || !userId) {
      return null;
    }

    const storedUsername =
      localStorage.getItem("username") ?? getUsernameFromToken(token) ?? "";

    return {
      token,
      role,
      userId: String(userId),
      username: storedUsername,
    };
  });

  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", String(data.userId));
    localStorage.setItem("username", username);
    setUser({
      token: data.token,
      role: data.role,
      userId: String(data.userId),
      username,
    });
    return data;
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
