import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login, getMe } from "./controllers/authController.js";
import userRoutes from "./routes/userRoutes.js";
// 1. Імпортуйте ваші роути курсів
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

console.log(
  "JWT Secret Status:",
  process.env.JWT_SECRET ? "Знайдено ✅" : "НЕ ЗНАЙДЕНО ❌",
);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Головна сторінка
app.get("/", (req, res) => {
  res.send("🚀 LMS API працює!");
});

// Маршрути авторизації
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.get("/api/auth/me", getMe);

// 2. ДОДАЙТЕ ЦЕЙ РЯДОК: Підключення маршрутів курсів
// Тепер усі маршрути з файлу courseRoutes будуть починатися з /api/courses
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено: http://localhost:${PORT}`);
});
