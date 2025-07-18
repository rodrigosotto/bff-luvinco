import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/pedidos", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Luvinco está funcionando!");
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
