// src/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import type { LoginData } from "../types";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch (err) {
      alert("Помилка входу");
    }
  };

  return (
    <div className="auth-form">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: "Email обов'язковий" })}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Пароль обов'язковий" })}
          placeholder="Пароль"
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          Увійти
        </button>
        <p style={{ color: "white", marginTop: "10px" }}>
          Немає акаунту?{" "}
          <Link to="/register" style={{ color: "#4da6ff" }}>
            Зареєструватися
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
