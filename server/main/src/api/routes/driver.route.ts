import { Router } from "express";
import { driverCtrl } from "../controllers";
const router = Router();
/* =================================
Driver Routes

"/:id"                     getUserById

================================= */

router.route('/:id').post(driverCtrl.getDriverById);

export default router;
