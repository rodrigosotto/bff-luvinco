import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("Configurando conexão com PostgreSQL...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Testar conexão ao iniciar
(async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL conectado com sucesso!");
    client.release();
  } catch (err) {
    console.error("Erro ao conectar ao PostgreSQL:", err);
    console.error("Detalhes do erro:", {
      code: (err as any).code,
      message: (err as any).message,
      stack: (err as any).stack,
    });
    console.error("Variáveis de ambiente:", {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_NAME: process.env.DB_NAME,
    });
    process.exit(1);
  }
})();

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
  getClient: () => pool.connect(),
};
