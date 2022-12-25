import { Router } from "express"
import usersCtrl from "../controllers/users.controller"
const router = new Router()

/*====================
  User Routes
  ====================*/

router.route("/register").post(usersCtrl.register)
router.route("/login").post(usersCtrl.login)
router.route("/logout").post(usersCtrl.logout)
router.route("/delete").delete(usersCtrl.delete)
/*====================
  In Progress   * = more important
  -----------
save current user geolocation to db, get geolocation lat and lon, 
router.route("/getLocation").get(usersCtrl.getCurrentLocation)

*update product: router.route("/:id/products/update").patch(vendorsCtrl.apiUpdateProduct)
*delete product: router.route("/:id/products/delete").put(vendorsCtrl.apiDeleteProduct)

searchproductsbyvendor
router.route("/:id/search/:query").get(shopCtrl.searchProductsByVendor)

update vendor preferences = update email, change password, change Vendor Name, change logo image, change bio
router.route("/config-options")
====================*/

export default router