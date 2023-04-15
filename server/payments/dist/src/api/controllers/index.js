"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "paymentCtrl", {
  enumerable: true,
  get: function get() {
    return _payment["default"];
  }
});
Object.defineProperty(exports, "stripeCtrl", {
  enumerable: true,
  get: function get() {
    return _stripe["default"];
  }
});
var _payment = _interopRequireDefault(require("./payment.controller"));
var _stripe = _interopRequireDefault(require("./stripe.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }