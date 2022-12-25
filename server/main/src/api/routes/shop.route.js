import { Router } from "express";
import shopCtrl from "../controllers/shop.controller";
import vendorCtrl from "../controllers/vendors.controller";
const router = new Router();

/*====================
  Shop Routes
====================*/
// get vendor details by vendorId
router.route("/get-vendor/:id").get(vendorCtrl.apiGetVendor);
router.route("/get-order-vendor/:id").get(shopCtrl.apiGetVendorForOrder);

// get products belonging to the vendorId
router.route("/get-vendor/:id/products").get(shopCtrl.getProductsByVendor);

// get products belonging to multiple vendors
router.route("/products&_page=:page&_limit=:limit").post(shopCtrl.getProducts);

// get product details by productId
router.route("/product-details/:id").get(shopCtrl.getProductById);

// get products by productCategory
router
  .route("/products&_page=:page&_limit=:limit&_category=:category")
  .get(shopCtrl.getProductsByCategory);

// add product to user cart
// router.route("/cart/:id").get(shopCtrl.getCart)
//                          .post(shopCtrl.addToCart)

// initialize checkout
// these will likely be adding their own microserver, for payment processing
router.route("/:id/checkout").get(shopCtrl.checkout);
// submit order for payment processing
// router.route("/:id/transaction").post(shopCtrl.transaction);
/*====================
  In Progress   * = more important
  -----------
Shop root, where shopping is done and products can be seen from all vendors
router.route("/").get(shopCtrl.getLocalProducts)
get vendors based on user location
router.route("/").get(vendorCtrl.getVendorByLocation)

get products by vendorName(in the case of a vendor being deleted, and wanting to recover the products of the deleted vendor)

search all products
router.route("/search").get(shopCtrl.searchProducts)

searchproductsbyvendor
router.route("/:id/search").get(shopCtrl.searchProductsByVendor)

update cart
remove from cart
//router.route("/cart").patch(shopCtrl.updateCart)
====================*/

export default router;
