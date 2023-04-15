"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backendConfig = void 0;
var _dataAccess = require("@cd/data-access");
var _appInfo = require("@cd/shared-config/auth/appInfo.js");
var _dashboard = _interopRequireDefault(require("supertokens-node/recipe/dashboard"));
var _emailpassword = _interopRequireDefault(require("supertokens-node/recipe/emailpassword"));
var _session = _interopRequireDefault(require("supertokens-node/recipe/session"));
var _dataAccess2 = require("../api/data-access");
var _excluded = ["timeJoined", "street1", "street2", "city", "state", "zipcode", "country", "countryCode"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import { UserRoleClaim } from "supertokens-node/recipe/userroles";
var backendConfig = function backendConfig() {
  console.log('SERVER MAIN BACKEND API INFO: ', _appInfo.appInfo);
  console.log('data base url: ', process && process.env && process.env.DATABASE_URL || "mysql://9zr5koln0y91fhumaiit:pscale_pw_rP9RqnT4pAkmmUawnaX67bkYr6AUAWJ2pBqhO9qVBpV@us-east.connect.psdb.cloud/cannabis_delivery_v1?sslaccept=strict");
  return {
    framework: 'express',
    supertokens: {
      connectionURI: process && process.env && process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567"
    },
    appInfo: _appInfo.appInfo,
    recipeList: [_emailpassword["default"].init({
      signUpFeature: {
        formFields: [{
          id: 'email'
        }, {
          id: 'password'
        }, {
          id: 're_password'
        }, {
          id: 'username'
        }, {
          id: 'firstName'
        }, {
          id: 'lastName'
        }, {
          id: 'phone'
        }, {
          id: 'dialCode'
        }, {
          id: 'countryCode'
        }, {
          id: 'country'
        }, {
          id: 'city'
        }, {
          id: 'state'
        }, {
          id: 'zipcode'
        }, {
          id: 'street1'
        }, {
          id: 'street2',
          optional: true
        }, {
          id: 'termsAccepted'
        }]
      },
      override: {
        functions: function functions(originalImplementation) {
          return _objectSpread(_objectSpread({}, originalImplementation), {}, {
            signIn: function signIn(input) {
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var user, response;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return (0, _dataAccess.findUserWithDetailsByEmail)(input.email);
                    case 3:
                      user = _context.sent;
                      console.log('user: ', user);
                      if (!(user === null)) {
                        _context.next = 8;
                        break;
                      }
                      console.log('User does not exist');
                      throw new Error('User does not exist');
                    case 8:
                      _context.next = 10;
                      return originalImplementation.signIn(_objectSpread(_objectSpread({}, input), {}, {
                        userContext: user
                      }));
                    case 10:
                      response = _context.sent;
                      console.log('backend signin reponse: ', response);
                      return _context.abrupt("return", response);
                    case 15:
                      _context.prev = 15;
                      _context.t0 = _context["catch"](0);
                      console.log('backend signin error: ', _context.t0);
                      // throw new Error(error)
                      return _context.abrupt("return", {
                        status: 'WRONG_CREDENTIALS_ERROR',
                        message: _context.t0
                      });
                    case 19:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, null, [[0, 15]]);
              }))();
            },
            signUp: function signUp(input) {
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                var response;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      _context2.next = 3;
                      return originalImplementation.signUp(input);
                    case 3:
                      response = _context2.sent;
                      return _context2.abrupt("return", response);
                    case 7:
                      _context2.prev = 7;
                      _context2.t0 = _context2["catch"](0);
                      console.log('backend signup error: ', _context2.t0);
                      throw new Error(_context2.t0);
                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2, null, [[0, 7]]);
              }))();
            }
          });
        },
        apis: function apis(originalImplementation) {
          return _objectSpread(_objectSpread({}, originalImplementation), {}, {
            signInPOST: function () {
              var _signInPOST = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(input) {
                var response;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return originalImplementation.signInPOST(input);
                    case 3:
                      response = _context3.sent;
                      console.log('sign in POST OK');
                      return _context3.abrupt("return", response);
                    case 8:
                      _context3.prev = 8;
                      _context3.t0 = _context3["catch"](0);
                      console.log('backend signInPost error: ', _context3.t0);
                      throw new Error(_context3.t0);
                    case 12:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[0, 8]]);
              }));
              function signInPOST(_x) {
                return _signInPOST.apply(this, arguments);
              }
              return signInPOST;
            }(),
            signUpPOST: function () {
              var _signUpPOST = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(input) {
                var formFieldsArr, formFields, formFieldsTransformed, createUserInput, timeJoined, street1, street2, city, state, zipcode, country, countryCode, createUserData, user, response;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.prev = 0;
                      if (!(originalImplementation.signUpPOST === undefined)) {
                        _context4.next = 3;
                        break;
                      }
                      throw Error('backend signUp: Something went wrong.');
                    case 3:
                      formFieldsArr = Object.values(input.formFields);
                      formFields = formFieldsArr.map(function (_, index) {
                        var id = formFieldsArr[index]['id'];
                        return _defineProperty({}, id, _['value']);
                      });
                      formFieldsTransformed = Object.assign.apply(Object, [{}].concat(_toConsumableArray(formFields)));
                      createUserInput = _objectSpread({}, formFieldsTransformed);
                      timeJoined = createUserInput.timeJoined, street1 = createUserInput.street1, street2 = createUserInput.street2, city = createUserInput.city, state = createUserInput.state, zipcode = createUserInput.zipcode, country = createUserInput.country, countryCode = createUserInput.countryCode, createUserData = _objectWithoutProperties(createUserInput, _excluded);
                      createUserData.address = {
                        street1: street1,
                        street2: street2,
                        city: city,
                        state: state,
                        zipcode: zipcode,
                        country: country,
                        countryCode: countryCode
                      };
                      createUserData.createdAt = new Date(timeJoined);
                      _context4.next = 12;
                      return _dataAccess2.UserDA.createUser(createUserData);
                    case 12:
                      user = _context4.sent;
                      input.userContext = _objectSpread({}, user);
                      console.log('signup input with usercontext: ', input);
                      _context4.next = 17;
                      return originalImplementation.signUpPOST(input);
                    case 17:
                      response = _context4.sent;
                      if (response.status === 'OK') {
                        console.log('sign up POST OK');
                        // future note: drivers will have only session active on a device.
                        // Drivers will need their own session function for login

                        response.user = _objectSpread(_objectSpread({}, response.user), response.session.getAccessTokenPayload());
                      }
                      return _context4.abrupt("return", response);
                    case 22:
                      _context4.prev = 22;
                      _context4.t0 = _context4["catch"](0);
                      console.log('backend signInPost error: ', _context4.t0.message);
                      return _context4.abrupt("return", {
                        status: 'GENERAL_ERROR',
                        message: _context4.t0.message
                      });
                    case 26:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4, null, [[0, 22]]);
              }));
              function signUpPOST(_x2) {
                return _signUpPOST.apply(this, arguments);
              }
              return signUpPOST;
            }()
          });
        }
      }
    }), _session["default"].init({
      override: {
        functions: function functions(originalImplementation) {
          return _objectSpread(_objectSpread({}, originalImplementation), {}, {
            createNewSession: function () {
              var _createNewSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(input) {
                var userId, session, sessionPayload;
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      userId = input.userContext.id;
                      input.userId = userId;
                      input.accessTokenPayload = _objectSpread(_objectSpread({}, input.accessTokenPayload), input.userContext);
                      _context5.next = 5;
                      return originalImplementation.createNewSession(input);
                    case 5:
                      session = _context5.sent;
                      sessionPayload = {
                        userId: input.userId,
                        username: input.accessTokenPayload.username,
                        email: input.accessTokenPayload.email
                      };
                      _context5.t0 = _dataAccess2.SessionDA;
                      _context5.t1 = session.getHandle();
                      _context5.t2 = sessionPayload;
                      _context5.next = 12;
                      return session.getExpiry();
                    case 12:
                      _context5.t3 = _context5.sent;
                      _context5.next = 15;
                      return _context5.t0.createUserSession.call(_context5.t0, _context5.t1, _context5.t2, _context5.t3);
                    case 15:
                      return _context5.abrupt("return", session);
                    case 16:
                    case "end":
                      return _context5.stop();
                  }
                }, _callee5);
              }));
              function createNewSession(_x3) {
                return _createNewSession.apply(this, arguments);
              }
              return createNewSession;
            }()
          });
        },
        apis: function apis(originalImplementation) {
          return _objectSpread(_objectSpread({}, originalImplementation), {}, {
            refreshPOST: function () {
              var _refreshPOST = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(input) {
                var session;
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return originalImplementation.refreshPOST(input);
                    case 2:
                      session = _context6.sent;
                      console.log('refresh session: ', session);
                      _context6.t0 = _dataAccess2.SessionDA;
                      _context6.t1 = session.getHandle();
                      _context6.next = 8;
                      return session.getExpiry();
                    case 8:
                      _context6.t2 = _context6.sent;
                      _context6.next = 11;
                      return _context6.t0.updateExpireSession.call(_context6.t0, _context6.t1, _context6.t2);
                    case 11:
                      return _context6.abrupt("return", session);
                    case 12:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              function refreshPOST(_x4) {
                return _refreshPOST.apply(this, arguments);
              }
              return refreshPOST;
            }(),
            signOutPOST: function () {
              var _signOutPOST = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(input) {
                var response;
                return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return originalImplementation.signOutPOST(input);
                    case 2:
                      response = _context7.sent;
                      _context7.next = 5;
                      return _dataAccess2.SessionDA.deleteSession(input.session.getHandle());
                    case 5:
                      return _context7.abrupt("return", response);
                    case 6:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              function signOutPOST(_x5) {
                return _signOutPOST.apply(this, arguments);
              }
              return signOutPOST;
            }()
          });
        }
      }
    }), _dashboard["default"].init({
      apiKey: process && process.env && process.env.SUPERTOKENS_DASHBOARD_KEY || "l87ZtvrDXHQZdqalA=M8j7r5=JmLDx"
    })],
    isInServerlessEnv: false
  };
};
exports.backendConfig = backendConfig;