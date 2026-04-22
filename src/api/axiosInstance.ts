import axios from "axios";

// Створюємо екземпляр
const api = axios.create({
  // ВИПРАВЛЕНО: тепер запити йдуть на твій локальний сервер
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR: Додаємо токен до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR: Обробка помилок (401, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Якщо токен невірний або протух — вибиваємо юзера на логін
      console.warn("Сесія завершена. Потрібен повторний вхід.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Перевіряємо, щоб не зациклити перенаправлення
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (status === 500) {
      console.error("Помилка сервера (500).");
    }

    return Promise.reject(error);
  },
);

export default api;
