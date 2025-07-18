import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

(async () => {
  try {
    const client = await pool.connect();
    client.release();
  } catch (err) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err);
    console.error("Detalhes do erro:", {
      code: (err as any).code,
      message: (err as any).message,
      stack: (err as any).stack,
    });
    process.exit(1);
  }
})();

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
  getClient: () => pool.connect(),
};
