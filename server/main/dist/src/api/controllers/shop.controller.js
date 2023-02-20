"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataAccess = require("../data-access");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import Stripe from "stripe";
// import stipeNode from "stripe";
/* =================================
ShopController - controller class for ecommerce business actions

members:
getOrdersByOrg
getOrderById
updateOrderById

getProductsByOrg
getProductById
searchProducts

// createOrder
================================= */
var ShopController = /*#__PURE__*/function () {
  function ShopController() {
    _classCallCheck(this, ShopController);
  }
  _createClass(ShopController, null, [{
    key: "getOrdersByOrg",
    value: function () {
      var _getOrdersByOrg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var organizationId, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              organizationId = req.params.id || {};
              _context.next = 4;
              return _dataAccess.OrderDA.getOrdersByOrg(organizationId);
            case 4:
              data = _context.sent;
              if (data) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", res.status(404).json('Orders not found'));
            case 7:
              return _context.abrupt("return", res.status(200).json(data));
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.log('API error: ', _context.t0);
              res.status(500).json({
                error: _context.t0
              });
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function getOrdersByOrg(_x, _x2) {
        return _getOrdersByOrg.apply(this, arguments);
      }
      return getOrdersByOrg;
    }()
  }, {
    key: "getOrderById",
    value: function () {
      var _getOrderById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var id, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id || '';
              _context2.next = 4;
              return _dataAccess.OrderDA.getOrderById(id);
            case 4:
              data = _context2.sent;
              if (data) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", res.status(404).json('Order not found'));
            case 7:
              return _context2.abrupt("return", res.status(200).json(data));
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.log('API error: ', _context2.t0);
              res.status(500).json({
                error: _context2.t0
              });
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getOrderById(_x3, _x4) {
        return _getOrderById.apply(this, arguments);
      }
      return getOrderById;
    }()
  }, {
    key: "updateOrderById",
    value: function () {
      var _updateOrderById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var order, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              order = req.body;
              _context3.next = 4;
              return _dataAccess.OrderDA.updateOrderById(order);
            case 4:
              data = _context3.sent;
              if (data) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", res.status(400).json('Could not update'));
            case 7:
              return _context3.abrupt("return", res.status(200).json(data));
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.log('API error: ', _context3.t0);
              res.status(500).json({
                error: _context3.t0
              });
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 10]]);
      }));
      function updateOrderById(_x5, _x6) {
        return _updateOrderById.apply(this, arguments);
      }
      return updateOrderById;
    }()
  }, {
    key: "getProductsByOrg",
    value: function () {
      var _getProductsByOrg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var organizationId, data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              organizationId = req.params.id || {};
              _context4.next = 4;
              return _dataAccess.OrderDA.getProductsByOrg(organizationId);
            case 4:
              data = _context4.sent;
              if (data) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", res.status(404).json('Products not found'));
            case 7:
              return _context4.abrupt("return", res.status(200).json(data));
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.log('API error: ', _context4.t0);
              res.status(500).json({
                error: _context4.t0
              });
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 10]]);
      }));
      function getProductsByOrg(_x7, _x8) {
        return _getProductsByOrg.apply(this, arguments);
      }
      return getProductsByOrg;
    }()
  }, {
    key: "getProductById",
    value: function () {
      var _getProductById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var id, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id || '';
              _context5.next = 4;
              return _dataAccess.OrderDA.getProductById(id);
            case 4:
              data = _context5.sent;
              if (data) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", res.status(404).json('Product not found'));
            case 7:
              return _context5.abrupt("return", res.status(200).json(data));
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              console.log('API error: ', _context5.t0);
              res.status(500).json({
                error: _context5.t0
              });
            case 14:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 10]]);
      }));
      function getProductById(_x9, _x10) {
        return _getProductById.apply(this, arguments);
      }
      return getProductById;
    }()
  }, {
    key: "searchProducts",
    value: function () {
      var _searchProducts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var _req$body, search, organizationId, data;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body = req.body, search = _req$body.search, organizationId = _req$body.organizationId;
              _context6.next = 4;
              return _dataAccess.OrderDA.searchProducts(search, organizationId);
            case 4:
              data = _context6.sent;
              if (data) {
                _context6.next = 7;
                break;
              }
              return _context6.abrupt("return", res.status(404).json('Products Not Found'));
            case 7:
              return _context6.abrupt("return", res.status(200).json(data));
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              console.log('API error: ', _context6.t0);
              res.status(500).json({
                error: _context6.t0
              });
            case 14:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 10]]);
      }));
      function searchProducts(_x11, _x12) {
        return _searchProducts.apply(this, arguments);
      }
      return searchProducts;
    }() // static async createOrder(req, res) {
    //   try {
    //     const { values, customerId, amount, tax, items, subtotal } = req.body
    //     const {
    //       cardCVC,
    //       cardNumber,
    //       cardYear,
    //       cardMonth,
    //       cardHolderName,
    //       checkCard,
    //       card,
    //       address,
    //       date,
    //       time,
    //       paymentType,
    //     } = values;
    //     const user = await User.findById(req.user);
    //     const orderData = {
    //       tax,
    //       items,
    //       paymentType,
    //       total: amount,
    //       customerId: user._id,
    //       preTaxTotal: subTotal,
    //       expectedDeliveryDate: date,
    //       expectedDeliveryTime: time,
    //       shipping: {
    //         email: user.email,
    //         name: address.name,
    //         city: address.city,
    //         phone: address.phone,
    //         postalCode: address.zip,
    //         country: address.country,
    //         address: address.street1 + address.street2,
    //       },
    //     };
    //     // create a new order
    //     const order = await Order.create(orderData);
    //     if (paymentType === "card") {
    //       let charged: Stripe.Response<Stripe.Charge>;
    //       if (!checkCard && cardCVC && cardNumber && cardYear && cardMonth && cardHolderName) {
    //         const cardToken = await createCardToken({
    //           cardHolderName,
    //           cardNumber,
    //           cardMonth,
    //           cardYear,
    //           cardCVC,
    //           address,
    //         });
    //         if (values.cardSaved) {
    //           const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
    //           charged = await createCharge({ amount, source: card.id, customer: customerId });
    //         } else {
    //           const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
    //           charged = await createCharge({ amount, source: card.id, customer: customerId });
    //           await stripe.customers.deleteSource(customerId, card.id);
    //         }
    //       }
    //       if (card && checkCard) {
    //         charged = await createCharge({ amount, source: card.cardId, customer: customerId });
    //       }
    //       const payment = await Payment.create({
    //         customerId: user._id,
    //         status: charged.status,
    //         gateway: "stripe",
    //         type: charged.payment_method_details.type,
    //         amount: charged.amount / 100,
    //         token: charged.id,
    //         card: {
    //           brand: charged.payment_method_details.card.brand,
    //           panLastFour: charged.payment_method_details.card.last4,
    //           expirationMonth: charged.payment_method_details.card.exp_month,
    //           expirationYear: charged.payment_method_details.card.exp_year,
    //         },
    //       });
    //       await Order.findByIdAndUpdate(
    //         { _id: order._id },
    //         { paymentId: payment._id, paymentStatus: payment.status },
    //         { new: true, upsert: true }
    //       );
    //     }
    //     // decrement the product stock
    //     items.forEach(async (item: { productId: string; quantity: number }) => {
    //       const product = await Product.findOne({ _id: item.productId });
    //       const newQuantity = product.skus[0].quantity - item.quantity;
    //       product.skus[0].quantity = newQuantity;
    //       await Product.updateOne({ _id: product._id }, { $set: product });
    //     });
    //     return res.status(201).json({ message: "Order created Successfully" });
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // }
  }]);
  return ShopController;
}();
exports["default"] = ShopController;