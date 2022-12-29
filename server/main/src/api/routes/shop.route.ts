import { Router } from "express";
import { shopCtrl } from "../controllers";

const router = Router();
/* =================================
Shop Routes

"/orders/org/:id"   getOrdersByOrg

"/orders/:id"       getOrderById

"/orders/:id"       updateOrderById
================================= */
router.route("/orders/org/:id").get(shopCtrl.getOrdersByOrg)

router.route("/orders/:id").get(shopCtrl.getOrderById)

router.route("/orders").put(shopCtrl.updateOrderById)

// router.route("/orders").post(shopCtrl.createOrder)

export default router;
