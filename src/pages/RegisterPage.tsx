import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import type { RegisterData } from "../types";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterData>();
  useAuth(); // Припустимо, ти додав це в контекст

  const onSubmit = (data: RegisterData) => console.log(data);

  return (
    <div className="page">
      <h2>Реєстрація в LMS</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Ім'я обов'язкове" })}
          placeholder="Повне ім'я"
        />
        <input
          {...register("email", { required: "Email обов'язковий" })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { minLength: 6 })}
          placeholder="Пароль"
        />

        <select {...register("role")}>
          <option value="student">Студент</option>
          <option value="teacher">Викладач</option>
          <option value="admin">Адміністратор</option>
        </select>

        <button type="submit">Створити акаунт</button>
      </form>
    </div>
  );
};
export default RegisterPage;
