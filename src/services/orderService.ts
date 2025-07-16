import { enviarPedido } from "./externalApiService";

export const processPedido = async (
  itens: { productId: string; quantidade: number }[]
) => {
  // Converte para o formato exigido pela Luvinco
  const payload = itens.map((i) => ({
    product_id: i.productId,
    quantity: i.quantidade,
  }));
  return enviarPedido(payload);
};
