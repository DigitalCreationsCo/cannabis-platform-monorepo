import { Router } from "express";
import { driverCtrl } from "../controllers";
const router = Router();
/* =================================
Driver Routes

"/:id"                     getUserById

"/status"                  updateStatus

================================= */

router.route('/:id').post(driverCtrl.getDriverById);

router.route("/status").post(driverCtrl.updateStatus);

export default router;
