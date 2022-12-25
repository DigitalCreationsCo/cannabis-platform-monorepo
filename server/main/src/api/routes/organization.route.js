import { Router } from "express";
import vendorsCtrl from "../controllers/vendors.controller";
const router = new Router();
import Websockets from "../../utils/Websockets";

/*====================
  Vendor Routes
====================*/
//add product to vendor
router.route("/:vendorId/product-upload").put(vendorsCtrl.productUpload);

router.route("/:id/pendingOrders").get(vendorsCtrl.getPendingOrders);
router.route("/addOrder").post(vendorsCtrl.addOrder);
router.route("/:id/deleteOrder").delete(vendorsCtrl.deleteOrder);

router.route("/register").post(vendorsCtrl.register);
router.route("/login").post(vendorsCtrl.login);
router.route("/logout").post(vendorsCtrl.logout);
router.route("/delete").delete(vendorsCtrl.delete);

/*====================
  In Progress   * = more important
  -----------
*update product: router.route("/:id/products/update").patch(vendorsCtrl.apiUpdateProduct)
*delete product: router.route("/:id/products/delete").put(vendorsCtrl.apiDeleteProduct)

*get vendor sales metrics -- available only for Vendors -- contain authentication logic!
router.route("/:id/salesMetrics")

searchproductsbyvendor
router.route("/:id/search").get(shopCtrl.searchProductsByVendor)
  
get product details by id - already exists in the shop routes

update vendor preferences = update email, change password, change Vendor Name, change logo image, change bio
router.route("/config-options")
====================*/

export default router;
