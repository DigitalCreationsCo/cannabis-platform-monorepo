import { Router } from "express";
import { orgCtrl } from "../controllers";
const router = Router();
/* =================================
Organization Routes

"/:id/categories"     getCategoryList

================================= */
// router.route("/:id/categories").get(orgCtrl.getCategoryList)

router.route("/:id/categories").get((req, res) => {
    res.status(500).json("Some categories were not found.");
})
// ^ product categories are available, entire category list for dispensary was not fetched.

export default router;
