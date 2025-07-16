import { Request, Response, NextFunction } from 'express';
import { processPedido } from '../services/orderService';

export const postPedido = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itens = req.body;
    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ message: 'Corpo da requisição deve ser um array de itens.' });
    }
    const resultado = await processPedido(itens);
    res.status(resultado.sucesso ? 201 : 500).json(resultado);
  } catch (err) {
    next(err);
  }
};
