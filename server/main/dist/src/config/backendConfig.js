"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backendConfig = void 0;
var _appInfo = require("@cd/shared-config/auth/appInfo");
var _dashboard = _interopRequireDefault(require("supertokens-node/recipe/dashboard"));
var _emailpassword = _interopRequireDefault(require("supertokens-node/recipe/emailpassword"));
var _session = _interopRequireDefault(require("supertokens-node/recipe/session"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var backendConfig = function backendConfig() {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI
    },
    appInfo: _appInfo.appInfo,
    recipeList: [_emailpassword["default"].init(), _session["default"].init(), _dashboard["default"].init({
      apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY
    })],
    isInServerlessEnv: true
  };
};
exports.backendConfig = backendConfig;