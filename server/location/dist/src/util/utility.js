"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPasswordMatch = exports.createToken = exports.createPasswordHash = void 0;
exports.sha265hex = sha265hex;
var _bcryptjs = require("bcryptjs");
var _nanoid = require("nanoid");
var _nodeCrypto = require("node:crypto");
var _excluded = ["password", "re_password"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * @param input String to hash
 * @returns Input hashed with SHA265 in hexadecimal form
 */
function sha265hex(input) {
  return (0, _nodeCrypto.createHash)('sha256').update(input).digest('hex');
}
var alphanumericChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Create a random alphanumberic string (of default length 128 characters)
 */
var createToken = (0, _nanoid.customAlphabet)(alphanumericChars, 128);

/**
 * Add passwordHash field to object, and remove password and re_password fields
 */
exports.createToken = createToken;
var createPasswordHash = function createPasswordHash(data) {
  var password = data.password,
    re_password = data.re_password,
    rest = _objectWithoutProperties(data, _excluded);
  return _objectSpread(_objectSpread({}, rest), {}, {
    passwordHash: (0, _bcryptjs.hashSync)(password, Number(process && process.env && process.env.PASSWORD_SALT_ROUNDS || "12"))
  });
};
exports.createPasswordHash = createPasswordHash;
var isPasswordMatch = function isPasswordMatch(password, passwordHash) {
  return (0, _bcryptjs.compareSync)(password, passwordHash !== null && passwordHash !== void 0 ? passwordHash : '');
};
exports.isPasswordMatch = isPasswordMatch;