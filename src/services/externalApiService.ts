import { Product } from "../types/product";

// Base da API real Luvinco
const API_BASE_URL =
  process.env.API_BASE_URL || "https://luvinco.proxy.beeceptor.com";
const AUTH_TOKEN =
  process.env.API_AUTH_TOKEN ||
  "wQ8ehU2x4gj93CH9lMTnelQO3GcFvLzyqn8Fj3WA0ffQy57I60";

/**
 * Busca produtos direto da API Luvinco.
 */
export const fetchProdutos = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE_URL}/products`, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error(`Falha ao buscar produtos: ${res.status}`);
  }

  const produtosApi: any[] = await res.json();

  // Normaliza no formato esperado pelo frontend
  return produtosApi.map((p) => ({
    id: p.product_id,
    nome: p.name,
    preco: Math.round(p.price),
    marca: p.brand,
    categoria: p.category,
    imagem: p.image_url,
    disponivel: p.stock > 0,
  }));
};

/**
 * Envia pedido para API Luvinco.
 * Converte para o payload aceito (`product_id`, `quantity`).
 */
export const enviarPedido = async (
  itens: { product_id: string; quantity: number }[]
): Promise<
  | { sucesso: true; pedidoId: string; mensagem: string; estimativa: string }
  | { sucesso: false; mensagem: string }
> => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN,
    },
    body: JSON.stringify({ items: itens }),
  });

  // API pode simular falha 500
  if (res.status === 500) {
    return {
      sucesso: false,
      mensagem: "Falha ao conectar ao servidor, tente novamente.",
    };
  }

  if (!res.ok) {
    throw new Error(`Erro ao criar pedido: ${res.status}`);
  }

  const data = await res.json();

  return {
    sucesso: true,
    pedidoId: data.order_id,
    mensagem: data.message,
    estimativa: data.estimated_delivery,
  };
};
