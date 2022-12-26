import { Router } from "express";
import { shopCtrl } from "../controllers";

const router = Router();
/* =================================
Shop Routes

getOrdersByOrg
getOrderById
createOrder
================================= */
router.route("/orders/org/:id").get(shopCtrl.getOrdersByOrg)

router.route("/orders/:id").get(shopCtrl.getOrderById)

router.route("/orders/:id").put(shopCtrl.updateOrder)

// router.route("/orders").post(shopCtrl.createOrder)

export default router;
