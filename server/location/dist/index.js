"use strict";

var _src = require("./src");
// import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';

var nodeEnv = process && process.env && process.env.NODE_ENV || "development";
// expand(config({ path: loadEnv(nodeEnv) }));
var port = process && process.env && process.env.SERVER_LOCATION_PORT || "6011" || 'NO_PORT_FOUND';
(0, _src.connectDb)().then(function () {
  _src.server.listen(port, function () {
    console.log(" \uD83D\uDE80 Server: LOCATION listening on port ".concat(port, "."));
    console.info(' ♞ Server: LOCATION running in ' + nodeEnv + ' mode.');
  });
})["catch"](function (err) {
  console.error('Error connecting to database: ', err.stack);
  process.exit(1);
});