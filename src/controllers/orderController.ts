import { Request, Response, NextFunction } from "express";
import { processPedido } from "../services/orderService";
import { BadRequestError } from "../errors/BadRequestError";
import { ItemPedido, PedidoModel } from "../models/Order";

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
export const criarPedido = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.usuarioId;
    const itens: ItemPedido[] = req.body.itens;

    if (!usuarioId) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado",
      });
    }

    if (!itens || itens.length === 0) {
      return res.status(400).json({
        success: false,
        message: "O pedido deve conter itens",
      });
    }

    const pedido = await PedidoModel.criar(usuarioId, itens);

    res.status(201).json({
      success: true,
      pedido,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao criar pedido",
    });
  }
};

export const listarPedidos = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado",
      });
    }

    const pedidos = await PedidoModel.listarPorUsuario(usuarioId);

    res.json({
      success: true,
      pedidos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar pedidos",
    });
  }
};
