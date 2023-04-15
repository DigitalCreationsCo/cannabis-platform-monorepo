"use strict";

var _dataAccess = _interopRequireDefault(require("@cd/data-access"));
var _src = require("./src");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { loadEnv } from '@cd/shared-config/config/loadEnv';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';
var nodeEnv = process && process.env && process.env.NODE_ENV || "production" || process && process.env && process.env.BABEL_ENV || "production";
// expand(config({ path: loadEnv(nodeEnv) }));
var port = process && process.env && process.env.SERVER_PAYMENTS_PORT || undefined || 'xxxx';
(0, _src.connectDb)(_dataAccess["default"]).then(function () {
  _src.server.listen(port, function () {
    console.log(" \uD83D\uDCB0 Server Payments listening on port ".concat(port, "."));
    console.info(' Server Payments running in ' + nodeEnv + ' mode.');
  });
})["catch"](function (err) {
  console.error('Error connecting to database: ', err.stack);
  process.exit(1);
});