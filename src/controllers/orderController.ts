import { Request, Response, NextFunction } from "express";
import { processPedido } from "../services/orderService";
import { BadRequestError } from "../errors/BadRequestError";

export const postPedido = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = req.body;
    if (!Array.isArray(items)) {
      throw new BadRequestError(
        "Corpo da requisição deve ser um array de itens."
      );
    }
    const resultado = await processPedido(items);
    res.status(resultado.sucesso ? 201 : 500).json(resultado);
  } catch (err) {
    next(err);
  }
};
