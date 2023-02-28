"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
User Routes

"/signin"                       signin

"/signout"                      signout

"/signout"                      signout

"/user/:id"                     getUserById

"/address"                      addAddressToUser

"/user/:id/address/:addressId"  getAddressById

"/user/:id/address/:addressId"  deleteAddressById

================================= */

router.route('/user/signin').post(_controllers.userCtrl.signin);
router.route('/user/signup').post(_controllers.userCtrl.signup);
router.route('/user/signout').post(_controllers.userCtrl.signout);
router.route('/user/:id').get(_controllers.userCtrl.getUserById);
router.route('/address').post(_controllers.userCtrl.addAddressToUser);
router.route('/user/:id/address/:addressId').get(_controllers.userCtrl.getAddressById);
router.route('/user/:id/address/:addressId')["delete"](_controllers.userCtrl.removeAddressFromUser);
var _default = router;
exports["default"] = _default;