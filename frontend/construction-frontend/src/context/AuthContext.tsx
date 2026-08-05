import { createContext, useContext, useState, type ReactNode } from "react";
import { loginRequest } from "../api/authApi.js";

interface User {
  token: string;
  role: string;
  userId: string;
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
    return token && role && userId ? { token, role, userId } : null;
  });

  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.userId);
    setUser({ token: data.token, role: data.role, userId: data.userId });
    return data;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
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
