"use strict";

var _src = require("./src");
// import { loadEnv } from '@cd/shared-config/config/loadEnv';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

var nodeEnv = process && process.env && process.env.NODE_ENV || "production";
// expand(config({ path: loadEnv(nodeEnv) }));
var port = process && process.env && process.env.SERVER_MAIN_PORT || "6001" || 'NO_PORT_FOUND';
(0, _src.connectDb)().then(function () {
  _src.server.listen(port, function () {
    console.log(" \uD83D\uDE80 Server Main listening on port ".concat(port, "."));
    console.info(' ♞ Server Main running in ' + nodeEnv + ' mode.');
  });
})["catch"](function (err) {
  console.error('Error connecting to database: ', err.stack);
  process.exit(1);
});