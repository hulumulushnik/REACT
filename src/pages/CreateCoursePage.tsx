import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { courseService } from "../api/courseService";

interface CreateCourseInputs {
  title: string;
  description: string;
}

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseInputs>();

  const onSubmit = async (data: CreateCourseInputs) => {
    try {
      await courseService.create(data);
      alert("Курс успішно створено!");
      navigate("/courses"); // Повернення до списку
    } catch (err) {
      console.error("Помилка створення:", err);
      alert("Не вдалося створити курс. Перевірте консоль.");
    }
  };

  return (
    <div className="page" style={{ padding: "20px", color: "white" }}>
      <h1>Створення нового курсу</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Назва курсу
          </label>
          <input
            {...register("title", { required: "Вкажіть назву курсу" })}
            placeholder="Наприклад: Основи React"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          />
          {errors.title && (
            <p style={{ color: "#ff4d4d", fontSize: "14px" }}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Опис курсу
          </label>
          <textarea
            {...register("description", { required: "Додайте опис курсу" })}
            placeholder="Про що цей курс..."
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          />
          {errors.description && (
            <p style={{ color: "#ff4d4d", fontSize: "14px" }}>
              {errors.description.message}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {isSubmitting ? "Збереження..." : "Створити курс"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses")}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
