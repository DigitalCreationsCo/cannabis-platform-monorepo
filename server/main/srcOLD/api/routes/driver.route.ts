import { Router } from "express";
import { driverCtrl } from "../controllers";
const router = Router();

/*====================
  Driver Routes
  ====================*/

// router.route("/register").post(usersCtrl.register);
// router.route("/login").post(usersCtrl.login);
// router.route("/logout").post(usersCtrl.logout);
// router.route("/delete").delete(usersCtrl.delete);

router.route("/onlineStatus").post(driverCtrl.updateStatus);
router.route("/currentLocation").post(driverCtrl.updateCurrentLocation);
router.route("/updateDriverPath").post(driverCtrl.updateOrderDriverPath);

router.route("/record/:id").get(driverCtrl.getDriverRecord);
router.route("/session/:id").get(driverCtrl.getDriverSession);

/*====================
  In Progress   * = more important
  -----------

update preferences = update email, change password, change Vendor Name, change logo image, change bio
====================*/

export default router;
