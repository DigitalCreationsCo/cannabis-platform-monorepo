"use strict";

var _dataAccess = _interopRequireDefault(require("@cd/data-access"));
var _loadEnv = require("@cd/shared-config/config/loadEnv.js");
var _dotenv = require("dotenv");
var _dotenvExpand = require("dotenv-expand");
var _src = require("./src");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var nodeEnv = process.env.NODE_ENV;
(0, _dotenvExpand.expand)((0, _dotenv.config)({
  path: (0, _loadEnv.loadEnv)(nodeEnv)
}));
var port = process.env.SERVER_MAIN_PORT || 'xxxx';
(0, _src.connectDb)(_dataAccess["default"]).then(function () {
  _src.server.listen(port, function () {
    console.log(" \uD83D\uDE80 Server Main listening on port ".concat(port, "."));
    console.info(' ♞ Server Main running in ' + nodeEnv + ' mode.');
  });
})["catch"](function (err) {
  console.error('Error connecting to database: ', err.stack);
  process.exit(1);
});