import { NextFunction, Request, Response } from "express";
import { cookieName, verifyToken } from "../utils/jwt.js";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.[cookieName];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Missing JWT secret" });

  try {
    const payload = verifyToken(token, secret);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
