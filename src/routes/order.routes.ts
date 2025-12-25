import { Router } from "express";
import { advanceOrder, createOrder, getOrders } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id/advance", advanceOrder);

export default router;