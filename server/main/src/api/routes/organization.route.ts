import { Router } from "express";
import { orgCtrl } from "../controllers";
const router = Router();
/* =================================
Organization Routes

"/:id/categories"     getCategoryList

================================= */

router.route("/:id/categories").get(orgCtrl.getCategoryList)

export default router;
