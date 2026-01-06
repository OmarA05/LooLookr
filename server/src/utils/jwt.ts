import jwt from "jsonwebtoken";

const TOKEN_NAME = "token";

export const createToken = (userId: string, secret: string, expiresIn = "7d") =>
  jwt.sign({ sub: userId }, secret, { expiresIn });

export const verifyToken = (token: string, secret: string) =>
  jwt.verify(token, secret) as { sub: string; iat: number; exp: number };

export const cookieName = TOKEN_NAME;
