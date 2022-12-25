import { Router } from "express"
import { userCtrl } from "../controllers"
const router = Router()

/*====================
  User Routes
  ====================*/

router.route("/register").post(userCtrl.register)
router.route("/login").post(userCtrl.login)
router.route("/logout").post(userCtrl.logout)
router.route("/delete").delete(userCtrl.delete)
/*====================
  In Progress   * = more important
  -----------
save current user geolocation to db, get geolocation lat and lon, 
router.route("/getLocation").get(userCtrl.getCurrentLocation)

*update product: router.route("/:id/products/update").patch(orgCtrl.apiUpdateProduct)
*delete product: router.route("/:id/products/delete").put(orgCtrl.apiDeleteProduct)

searchproductsbyvendor
router.route("/:id/search/:query").get(shopCtrl.searchProductsByVendor)

update vendor preferences = update email, change password, change Vendor Name, change logo image, change bio
router.route("/config-options")
====================*/

export default router