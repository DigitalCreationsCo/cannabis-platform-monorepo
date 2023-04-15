"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataAccess = require("@cd/data-access");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* =================================
Order Data Access - data class for order table

members: 
createOrder
createPurchase

getOrdersByOrg
getOrderById
updateOrderById

getProductsByOrg
getProductById
searchProducts

updateProductVariantQuantity

================================= */
var OrderDA = /*#__PURE__*/function () {
  function OrderDA() {
    _classCallCheck(this, OrderDA);
  }
  _createClass(OrderDA, null, [{
    key: "createOrder",
    value: function () {
      var _createOrder2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(order) {
        var data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _dataAccess.createOrder)(order);
            case 3:
              data = _context.sent;
              return _context.abrupt("return", data);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0.message);
              throw new Error(_context.t0.message);
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function createOrder(_x) {
        return _createOrder2.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "createPurchase",
    value: function () {
      var _createPurchase2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(purchase) {
        var data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _dataAccess.createPurchase)(purchase);
            case 3:
              data = _context2.sent;
              return _context2.abrupt("return", data);
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0.message);
              throw new Error(_context2.t0.message);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function createPurchase(_x2) {
        return _createPurchase2.apply(this, arguments);
      }
      return createPurchase;
    }()
  }, {
    key: "getOrdersByOrg",
    value: function () {
      var _getOrdersByOrg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(organizationId) {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _dataAccess.findOrdersByOrg)(organizationId);
            case 3:
              data = _context3.sent;
              return _context3.abrupt("return", data);
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0.message);
              throw new Error(_context3.t0.message);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function getOrdersByOrg(_x3) {
        return _getOrdersByOrg.apply(this, arguments);
      }
      return getOrdersByOrg;
    }()
  }, {
    key: "getOrderById",
    value: function () {
      var _getOrderById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
        var data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return (0, _dataAccess.findOrderWithDetails)(id);
            case 3:
              data = _context4.sent;
              return _context4.abrupt("return", data);
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0.message);
              throw new Error(_context4.t0.message);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function getOrderById(_x4) {
        return _getOrderById.apply(this, arguments);
      }
      return getOrderById;
    }()
  }, {
    key: "updateOrderById",
    value: function () {
      var _updateOrderById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(order) {
        var data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _dataAccess.updateOrderWithOrderItems)(order);
            case 3:
              data = _context5.sent;
              return _context5.abrupt("return", data);
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0.message);
              throw new Error(_context5.t0.message);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }));
      function updateOrderById(_x5) {
        return _updateOrderById.apply(this, arguments);
      }
      return updateOrderById;
    }()
  }, {
    key: "getProductsByOrg",
    value: function () {
      var _getProductsByOrg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(organizationIdList) {
        var page,
          limit,
          idList,
          data,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 20;
              _context6.prev = 2;
              idList = Array.isArray(organizationIdList) ? organizationIdList : [organizationIdList];
              _context6.next = 6;
              return (0, _dataAccess.findProductsByOrg)(idList, page, limit);
            case 6:
              data = _context6.sent;
              return _context6.abrupt("return", data);
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](2);
              console.error(_context6.t0.message);
              throw new Error(_context6.t0.message);
            case 14:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[2, 10]]);
      }));
      function getProductsByOrg(_x6) {
        return _getProductsByOrg.apply(this, arguments);
      }
      return getProductsByOrg;
    }()
  }, {
    key: "getProductById",
    value: function () {
      var _getProductById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
        var data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _dataAccess.findProductWithDetails)(id);
            case 3:
              data = _context7.sent;
              return _context7.abrupt("return", data);
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0.message);
              throw new Error(_context7.t0.message);
            case 11:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }));
      function getProductById(_x7) {
        return _getProductById.apply(this, arguments);
      }
      return getProductById;
    }()
  }, {
    key: "searchProducts",
    value: function () {
      var _searchProducts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(search) {
        var organizationId,
          data,
          _args8 = arguments;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              organizationId = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
              _context8.prev = 1;
              _context8.next = 4;
              return (0, _dataAccess.findProductsByText)(search, organizationId);
            case 4:
              data = _context8.sent;
              return _context8.abrupt("return", data);
            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](1);
              console.error(_context8.t0.message);
              throw new Error(_context8.t0.message);
            case 12:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[1, 8]]);
      }));
      function searchProducts(_x8) {
        return _searchProducts.apply(this, arguments);
      }
      return searchProducts;
    }()
  }, {
    key: "updateProductVariantQuantity",
    value: function () {
      var _updateProductVariantQuantity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(variantId, quantity) {
        var data;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return (0, _dataAccess.updateVariantQuantity)(variantId, quantity, '-');
            case 3:
              data = _context9.sent;
              return _context9.abrupt("return", data);
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              console.error(_context9.t0.message);
              throw new Error(_context9.t0.message);
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 7]]);
      }));
      function updateProductVariantQuantity(_x9, _x10) {
        return _updateProductVariantQuantity.apply(this, arguments);
      }
      return updateProductVariantQuantity;
    }()
  }]);
  return OrderDA;
}();
exports["default"] = OrderDA;