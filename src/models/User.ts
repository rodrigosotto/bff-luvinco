import db from "../config/database";
import bcrypt from "bcryptjs";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha_hash: string;
  criado_em: Date;
}

export interface UsuarioInput {
  nome: string;
  email: string;
  senha: string;
}

export class UsuarioModel {
  static async criar(usuarioInput: UsuarioInput): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(usuarioInput.senha, 10);
    const query = `
      INSERT INTO usuarios (nome, email, senha_hash)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email, criado_em
    `;
    const { rows } = await db.query(query, [
      usuarioInput.nome,
      usuarioInput.email,
      hashedPassword,
    ]);
    return rows[0];
  }

  static async buscarPorEmail(email: string): Promise<Usuario | null> {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await db.query(query, [email]);
    return rows[0] || null;
  }

  static async verificarSenha(
    senha: string,
    senhaHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}
