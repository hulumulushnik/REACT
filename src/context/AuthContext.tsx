import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, LoginData, RegisterData } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Авто-логін при перезавантаженні (Пункт 1.1)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      // В реальному проекті тут має бути запит до API для перевірки токена
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    // Імітація запиту до API
    console.log("Logging in with:", data);
    const mockUser: User = {
      id: "1",
      email: data.email,
      name: "John Doe",
      role: "admin", // Для тесту можна міняти роль тут
    };

    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (data: RegisterData) => {
    console.log("Registering:", data);
    // Логіка реєстрації...
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
