import jwt from "jsonwebtoken";

const TOKEN_NAME = "token";

export const createToken = (
  userId: string,
  secret: jwt.Secret,
  expiresIn: jwt.SignOptions["expiresIn"] = "7d"
) => jwt.sign({ sub: userId }, secret, { expiresIn });

export const verifyToken = (token: string, secret: jwt.Secret) =>
  jwt.verify(token, secret) as { sub: string; iat: number; exp: number };

export const cookieName = TOKEN_NAME;
