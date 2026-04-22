import { useForm } from "react-hook-form";
// ПРАВИЛЬНО: Прибираємо "type" перед useAuth
import { useAuth } from "../context/AuthContext";
import type { LoginData } from "../types";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
      // Оскільки бекенд видає 200 OK, navigate спрацює!
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
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
        {/* Використовуємо errors, щоб прибрати warning */}
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
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>

        <p style={{ marginTop: "15px", color: "white" }}>
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
