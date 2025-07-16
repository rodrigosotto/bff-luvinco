import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
