import { Request, Response } from "express";
import { UsuarioModel, UsuarioInput } from "../models/User";
import { generateToken } from "../config/jwt";

export const registrar = async (req: Request, res: Response) => {
  try {
    const usuarioInput: UsuarioInput = req.body;

    // Verificar se email já existe
    const usuarioExistente = await UsuarioModel.buscarPorEmail(
      usuarioInput.email
    );
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
      });
    }

    const novoUsuario = await UsuarioModel.criar(usuarioInput);
    const token = generateToken(novoUsuario.id);

    res.status(201).json({
      success: true,
      token,
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao registrar usuário",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const usuario = await UsuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const senhaCorreta = await UsuarioModel.verificarSenha(
      senha,
      usuario.senha_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = generateToken(usuario.id);

    res.json({
      success: true,
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao fazer login",
    });
  }
};
