"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Stripe Account Routes

'/stripe/dispensary-authorize'     authorizeDispensaryAccount

================================= */

router.route('/stripe/dispensary-account').get(_controllers.stripeCtrl.createDispensaryAccount);
var _default = router;
exports["default"] = _default;