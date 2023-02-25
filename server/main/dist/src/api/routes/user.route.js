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

"/login"                        login

"/logout"                       logout

"/user/:id"                     getUserById

"/address"                      addAddressToUser

"/user/:id/address/:addressId"  getAddressById

"/user/:id/address/:addressId"  deleteAddressById

================================= */

router.route('/login').post(_controllers.userCtrl.login);
router.route('/logout').post(_controllers.userCtrl.logout);
router.route('/user/:id').get(_controllers.userCtrl.getUserById);
router.route('/address').post(_controllers.userCtrl.addAddressToUser);
router.route('/user/:id/address/:addressId').get(_controllers.userCtrl.getAddressById);
router.route('/user/:id/address/:addressId')["delete"](_controllers.userCtrl.removeAddressFromUser);
var _default = router;
exports["default"] = _default;