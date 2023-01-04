import { Router } from "express";
import { orgCtrl } from "../controllers";
const router = Router();
/* =================================
Organization Routes

"/:id/categories"     getCategoryList

"/product/:id/update"     updateProduct

================================= */

router.route("/:id/categories").get(orgCtrl.getCategoryList)

router.route("/product/:id/update").put(orgCtrl.updateProduct)

export default router;
