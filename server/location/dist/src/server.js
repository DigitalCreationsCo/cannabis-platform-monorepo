"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _routes = require("./api/routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
console.log('Starting server...');
console.log('node env: ', process && process.env && process.env.NODE_ENV || "development");
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api/v1/healthcheck', function (req, res) {
  return res.status(200).json('OK');
});
app.use('/api/v1/serveLocal', _routes.serveLocal);
app.use('*', function (req, res) {
  return res.status(404).json({
    error: 'API not found'
  });
});
var server = _http["default"].createServer(app);
var _default = server;
exports["default"] = _default;