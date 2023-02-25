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
  console.log('SERVER MAIN: appInfo: ', _appInfo.appInfo);
  return {
    framework: "express",
    supertokens: {
      connectionURI: process && process.env && process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567"
    },
    appInfo: _appInfo.appInfo,
    recipeList: [_emailpassword["default"].init(), _session["default"].init(), _dashboard["default"].init({
      apiKey: process && process.env && process.env.SUPERTOKENS_DASHBOARD_KEY || "l87ZtvrDXHQZdqalA=M8j7r5=JmLDx"
    })],
    isInServerlessEnv: false
  };
};
exports.backendConfig = backendConfig;