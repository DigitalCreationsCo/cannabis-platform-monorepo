"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _appInfo = require("@cd/shared-config/auth/appInfo");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _supertokensNode = _interopRequireDefault(require("supertokens-node"));
var _express2 = require("supertokens-node/framework/express");
var _routes = require("./api/routes");
var _backendConfig = require("./config/backendConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
console.log('Starting server...');
console.log('supertokens connection string: ', process && process.env && process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567");
console.log('node env: ', process && process.env && process.env.NODE_ENV || "production");
if (_supertokensNode["default"]) {
  _supertokensNode["default"].init((0, _backendConfig.backendConfig)());
} else throw Error('Supertokens is not available.');
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: _appInfo.websiteDomain,
  allowedHeaders: ['content-type'].concat(_toConsumableArray(_supertokensNode["default"].getAllCORSHeaders())),
  credentials: true
}));
app.use((0, _express2.middleware)());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api/v1/healthcheck', function (req, res) {
  return res.status(200).json('OK');
});
// app.get('/api/v1/session', async (req:SessionRequest, res, next) => {
//     try {
//         await verifySession()(req, res, next);
//         // await superTokensNextWrapper(
//         //     async (next) => {
//         //         return await verifySession()(req, res, next);
//         //     },
//         //     req,
//         //     res
//         // );
//         // console.log('getting session from supertokens');
//         let sessionData = req.session;
//         console.log('session data: ', sessionData);

//         // console.log('Session available?: ', req.session)
//         // return res.status(200).json({
//         //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
//         //     session: req.session.getSessionData(),
//         //     user: req.session.getUserId(),
//         //     accessTokenPayload: req.session.getAccessTokenPayload(),
//         // });
//         // const session = {
//         //     user: {
//         //         username: 'kbarnes',
//         //         firstName: 'Katie',
//         //         lastName: 'Barnes',
//         //         memberships: [{ organizationId: '2' }]
//         //     }
//         // };
//         // console.log('Session: SERVER: ', req.session)
//         const session = {
//             user: null
//         }
//         return res.send({ session, user: session.user });
//     } catch (error) {
//         console.log('API error: ', error);
//         res.status(500).json({ error });
//     }
// });

app.use('/api/v1/auth', _routes.user);
app.use('/api/v1/driver', _routes.driver);
app.use('/api/v1/session', _routes.session);
app.use('/api/v1/shop', _routes.shop);
app.use('/api/v1/organization', _routes.organization);
// error handling test routes
app.use('/api/v1/error', _routes.error);
// supertokens errorhandler
app.use((0, _express2.errorHandler)());
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => { /* ... */ });
app.use('*', function (req, res) {
  return res.status(404).json({
    error: 'API not found'
  });
});
var server = _http["default"].createServer(app);
var _default = server;
exports["default"] = _default;