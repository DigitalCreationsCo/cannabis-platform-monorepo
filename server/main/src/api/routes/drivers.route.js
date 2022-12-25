import { Router } from "express";
import { route } from "express/lib/application";
import driversCtrl from "../controllers/drivers.controller";
const router = new Router();

/*====================
  Driver Routes
  ====================*/

// router.route("/register").post(usersCtrl.register);
// router.route("/login").post(usersCtrl.login);
// router.route("/logout").post(usersCtrl.logout);
// router.route("/delete").delete(usersCtrl.delete);

router.route("/onlineStatus").post(driversCtrl.updateStatus);
router.route("/currentLocation").post(driversCtrl.updateCurrentLocation);
router.route("/updateDriverPath").post(driversCtrl.updateOrderDriverPath);

router.route("/record/:id").get(driversCtrl.getDriverRecord);
router.route("/session/:id").get(driversCtrl.getDriverSession);

/*====================
  In Progress   * = more important
  -----------

update preferences = update email, change password, change Vendor Name, change logo image, change bio
====================*/

export default router;
