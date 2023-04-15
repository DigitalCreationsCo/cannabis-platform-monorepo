"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongodb = require("mongodb");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-nocheck;
var Product = /*#__PURE__*/function () {
  function Product(_ref) {
    var vendorId = _ref.vendorId,
      vendorName = _ref.vendorName,
      productName = _ref.productName,
      _ref$productId = _ref.productId,
      productId = _ref$productId === void 0 ? new _mongodb.ObjectId() : _ref$productId,
      description = _ref.description,
      quantityInStock = _ref.quantityInStock,
      price = _ref.price,
      _ref$reviews = _ref.reviews,
      reviews = _ref$reviews === void 0 ? [] : _ref$reviews,
      productCategory = _ref.productCategory,
      imageUrl = _ref.imageUrl;
    _classCallCheck(this, Product);
    this.vendorId = vendorId, this.vendorName = vendorName, this.productName = productName, this.productId = productId, this.description = description, this.quantityInStock = quantityInStock, this.price = price, this.reviews = reviews, this.productCategory = productCategory, this.imageUrl = imageUrl;
  }
  _createClass(Product, [{
    key: "toJson",
    value: function toJson() {
      return {
        vendorId: this.vendorId,
        vendorName: this.vendorName,
        productName: this.productName,
        productId: this.productId,
        description: this.description,
        quantityInStock: this.quantityInStock,
        price: this.price,
        reviews: this.reviews,
        productCategory: this.productCategory,
        imageUrl: this.imageUrl
      };
    }
  }]);
  return Product;
}();
exports["default"] = Product;