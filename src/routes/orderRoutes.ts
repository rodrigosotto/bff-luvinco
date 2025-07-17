import express from "express";
import { criarPedido, listarPedidos } from "../controllers/orderController";
import { autenticar } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(autenticar);
router.post("/", criarPedido);
router.get("/", listarPedidos);

export default router;
