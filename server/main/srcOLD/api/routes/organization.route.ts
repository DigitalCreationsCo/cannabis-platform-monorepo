import { Router } from "express";
import { orgCtrl } from "../controllers";
const router = Router();

/*====================
  Vendor Routes
====================*/
//add product to vendor
router.route("/:vendorId/product-upload").put(orgCtrl.productUpload);

router.route("/:id/pendingOrders").get(orgCtrl.getPendingOrders);
router.route("/addOrder").post(orgCtrl.addOrder);
router.route("/:id/deleteOrder").delete(orgCtrl.deleteOrder);

router.route("/register").post(orgCtrl.register);
router.route("/login").post(orgCtrl.login);
router.route("/logout").post(orgCtrl.logout);
router.route("/delete").delete(orgCtrl.delete);

/*====================
  In Progress   * = more important
  -----------
*update product: router.route("/:id/products/update").patch(orgCtrl.apiUpdateProduct)
*delete product: router.route("/:id/products/delete").put(orgCtrl.apiDeleteProduct)

*get vendor sales metrics -- available only for Vendors -- contain authentication logic!
router.route("/:id/salesMetrics")

searchproductsbyvendor
router.route("/:id/search").get(shopCtrl.searchProductsByVendor)
  
get product details by id - already exists in the shop routes

update vendor preferences = update email, change password, change Vendor Name, change logo image, change bio
router.route("/config-options")
====================*/

export default router;
