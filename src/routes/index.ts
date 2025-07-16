import { Router } from "express";
import { getProdutos } from "../controllers/productController";
import { postPedido } from "../controllers/orderController";

const router = Router();

router.get("/produtos", getProdutos);
router.post("/pedidos", postPedido);

export default router;
