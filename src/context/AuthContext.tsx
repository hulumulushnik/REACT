import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { authService } from "../api/authService";
import type { User, LoginData, RegisterData } from "../types/index";

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Вхід у систему
  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      if (response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
      }
    } catch (err) {
      throw err; // Прокидуємо помилку далі для обробки в компоненті (LoginPage)
    }
  };

  // Реєстрація користувача
  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
      // Оскільки ваш бекенд не повертає токен при реєстрації,
      // ми просто завершуємо функцію.
      // Після цього в RegisterPage.tsx можна викликати login() або navigate("/login")
    } catch (err) {
      throw err;
    }
  };

  // Вихід із системи
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Автоматична перевірка токена при завантаженні сторінки
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (err) {
        console.error("Сесія застаріла або невірна");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
