"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Session Routes

"/"                 getSession

"/password/reset"   sendPasswordResetTokenEmail

"/password/reset"   doResetPassword

================================= */

router.route('/').get(_controllers.sessionCtrl.getSession);
router.route('/password/reset').post(_controllers.sessionCtrl.sendPasswordResetTokenEmail);
router.route('/password/reset/token').post(_controllers.sessionCtrl.doResetPassword);
var _default = router;
exports["default"] = _default;