"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Serve Local Data Routes

/organizations      getLocalOrganizations

/create             addOrganizationLocationRecord

================================= */

router.route('/organizations').post(_controllers.locationCtrl.getLocalOrganizations);
router.route('/create-record').post(_controllers.locationCtrl.addOrganizationLocationRecord);
var _default = router;
exports["default"] = _default;