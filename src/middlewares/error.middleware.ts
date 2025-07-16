import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`[${err.name}] ${err.message}`);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      error: err.name,
      message: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    error: "InternalServerError",
    message: "Erro interno do servidor",
  });
};
