import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "../models/User.js";
import { createToken, cookieName, verifyToken } from "../utils/jwt.js";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(2).max(30).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const cookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password, username } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, passwordHash });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Missing JWT secret" });

  const token = createToken(user.id, secret);
  res.cookie(cookieName, token, cookieOptions());
  res.json({ user: { id: user.id, email: user.email, username: user.username } });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Missing JWT secret" });

  const token = createToken(user.id, secret);
  res.cookie(cookieName, token, cookieOptions());
  res.json({ user: { id: user.id, email: user.email, username: user.username } });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(cookieName, cookieOptions());
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  const token = req.cookies?.[cookieName];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "Missing JWT secret" });

  try {
    const payload = verifyToken(token, secret);
    const user = await User.findById(payload.sub).select("email username");
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    return res.json({ user: { id: user.id, email: user.email, username: user.username } });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
