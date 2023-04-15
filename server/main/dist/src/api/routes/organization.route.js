"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Organization Routes

"/"     createOrganization

"/:id"     getOrganizationById

"/:id/categories"     getCategoryList

"/:id/users"     getUsersByOrganization

"/product/:id/update"     updateProduct

================================= */

router.route('/').post(_controllers.orgCtrl.createOrganization);
router.route('/:id').get(_controllers.orgCtrl.getOrganizationById);
router.route('/:id/categories').get(_controllers.orgCtrl.getCategoryList);
router.route('/:id/users').get(_controllers.orgCtrl.getUsersByOrganization);
router.route('/product/:id/update').put(_controllers.orgCtrl.updateProduct);
var _default = router;
exports["default"] = _default;