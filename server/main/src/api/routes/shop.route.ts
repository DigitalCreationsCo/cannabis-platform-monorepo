import { Router } from "express";
import { shopCtrl } from "../controllers";
const router = Router();
/* =================================
Shop Routes

getOrdersByOrg
createOrder
================================= */
router.route("/orders:id").get(shopCtrl.getOrdersByOrg)

// router.route("/orders").post(shopCtrl.createOrder)

export default router;
