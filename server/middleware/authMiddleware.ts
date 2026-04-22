import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Доступ заборонено. Токен відсутній." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Додаємо дані користувача (id, role) в запит
    next();
  } catch (err) {
    res.status(403).json({ message: "Невалідний токен." });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "У вас недостатньо прав для цієї дії." });
    }
    next();
  };
};
