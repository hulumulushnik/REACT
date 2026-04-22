import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = Router();

// Тільки адмін може виконувати ці дії
router.get("/", verifyToken, checkRole(["admin"]), getAllUsers);
router.patch("/:id/role", verifyToken, checkRole(["admin"]), updateUserRole);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteUser);

export default router;
