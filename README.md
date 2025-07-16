# Mock Shop Backend

Este projeto é um backend Node.js 22.14.0 escrito em TypeScript que atua como intermediário entre uma API externa mockada de produtos e um front‑end.

## Endpoints
- **GET /api/produtos** – lista de produtos.
- **POST /api/pedidos** – cria pedido (mock).

## Como rodar

```bash
# dentro da pasta onde descompactou o zip
cp .env.example .env
docker compose up --build
```

A API ficará em `http://localhost:3000`.

---
