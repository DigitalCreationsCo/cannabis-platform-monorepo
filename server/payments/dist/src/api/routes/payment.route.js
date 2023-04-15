"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Payment Routes

'/purchase'             processOrderPayment

================================= */

router.route('/purchase').post(_controllers.paymentCtrl.processPurchase);
var _default = router;
exports["default"] = _default;