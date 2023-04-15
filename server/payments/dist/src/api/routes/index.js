"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "accountRoutes", {
  enumerable: true,
  get: function get() {
    return _account["default"];
  }
});
Object.defineProperty(exports, "paymentRoutes", {
  enumerable: true,
  get: function get() {
    return _payment["default"];
  }
});
var _account = _interopRequireDefault(require("./account.route"));
var _payment = _interopRequireDefault(require("./payment.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }