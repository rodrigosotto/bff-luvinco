import db from "../config/database";

export interface ItemPedido {
  produto_id: number;
  quantidade: number;
  preco: number;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  total: number;
  status: string;
  criado_em: Date;
}

export interface PedidoComItens extends Pedido {
  itens: ItemPedido[];
}

export class PedidoModel {
  static async criar(
    usuarioId: number,
    itens: ItemPedido[]
  ): Promise<PedidoComItens> {
    const client = await db.getClient();

    try {
      await client.query("BEGIN");

      // Calcular total
      const total = itens.reduce(
        (sum, item) => sum + item.quantidade * item.preco,
        0
      );

      // Criar pedido
      const pedidoQuery = `
        INSERT INTO pedidos (usuario_id, total)
        VALUES ($1, $2)
        RETURNING id, usuario_id, total, status, criado_em
      `;
      const pedidoResult = await client.query<Pedido>(pedidoQuery, [
        usuarioId,
        total,
      ]);
      const pedido = pedidoResult.rows[0];

      // Adicionar itens
      for (const item of itens) {
        const itemQuery = `
          INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco)
          VALUES ($1, $2, $3, $4)
        `;
        await client.query(itemQuery, [
          pedido.id,
          item.produto_id,
          item.quantidade,
          item.preco,
        ]);
      }

      await client.query("COMMIT");

      return {
        ...pedido,
        itens,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async listarPorUsuario(usuarioId: number): Promise<PedidoComItens[]> {
    const pedidosQuery = `
      SELECT id, total, status, criado_em
      FROM pedidos
      WHERE usuario_id = $1
      ORDER BY criado_em DESC
    `;
    const pedidosResult = await db.query(pedidosQuery, [usuarioId]);

    const pedidosComItens: PedidoComItens[] = [];

    for (const pedido of pedidosResult.rows) {
      const itensQuery = `
        SELECT produto_id, quantidade, preco
        FROM itens_pedido
        WHERE pedido_id = $1
      `;
      const itensResult = await db.query(itensQuery, [pedido.id]);

      pedidosComItens.push({
        ...pedido,
        usuario_id: usuarioId,
        itens: itensResult.rows,
      });
    }

    return pedidosComItens;
  }
}
