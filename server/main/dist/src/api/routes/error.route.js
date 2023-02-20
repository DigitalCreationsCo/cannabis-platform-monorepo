"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var router = (0, _express.Router)();
/* =================================
Error Handling Test Routes

"/badParam/:id"     Bad Query Parameter
"/500"              500 Response Error
"/200WithError"     200 Response With Error
"/200"              200 Ok

================================= */
router.route("/badParam/:id").get(function (req, res) {
  res.status(404).json("Bad query parameter.");
});
router.route("/500").get(function (req, res) {
  res.status(500).json("An error occurred.");
});
router.route("/200WithError").get(function (req, res) {
  res.status(200).json("An error occurred.");
});
router.route("/200").get(function (req, res) {
  res.status(200).json("ok");
});
var _default = router;
exports["default"] = _default;