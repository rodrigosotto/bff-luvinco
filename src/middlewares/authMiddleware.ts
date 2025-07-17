import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

declare global {
  namespace Express {
    interface Request {
      usuarioId?: number;
    }
  }
}

export const autenticar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Acesso não autorizado",
      });
    }

    const decoded = verifyToken(token);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido ou expirado",
    });
  }
};
