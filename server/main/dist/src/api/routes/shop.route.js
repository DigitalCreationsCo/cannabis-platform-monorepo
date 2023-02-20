"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Shop Routes

"/orders/org/:id"   getOrdersByOrg

"/orders/:id"       getOrderById

"/orders"           updateOrderById

"/products/org/:id" getProductsByOrg

"/products/:id"     getProductById

"/products"         searchProducts

================================= */

router.route('/orders/org/:id').get(_controllers.shopCtrl.getOrdersByOrg);
router.route('/orders/:id').get(_controllers.shopCtrl.getOrderById);

// router.route("/orders").post(shopCtrl.createOrder)

router.route('/orders').put(_controllers.shopCtrl.updateOrderById);
router.route('/products/org/:id').get(_controllers.shopCtrl.getProductsByOrg);
router.route('/products/:id').get(_controllers.shopCtrl.getProductById);
router.route('/products').post(_controllers.shopCtrl.searchProducts);
var _default = router;
exports["default"] = _default;