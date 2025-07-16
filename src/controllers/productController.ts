import { Request, Response, NextFunction } from "express";
import { fetchProdutos } from "../services/externalApiService";

export const getProdutos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const produtos = await fetchProdutos();
    res.json(produtos);
  } catch (err) {
    next(err);
  }
};
